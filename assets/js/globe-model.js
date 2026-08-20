export const GLOBE_VIEW = Object.freeze({
  phi: 75 * Math.PI / 180,
  theta: 47 * Math.PI / 180
});

export const GLOBE_STYLE = Object.freeze({
  radiusRatio: 0.44,
  sphere: ['rgba(4, 87, 97, 0.94)', 'rgba(3, 68, 78, 0.97)', 'rgba(2, 47, 57, 0.995)'],
  dot: [42, 225, 241],
  outline: 'rgba(42, 225, 241, 0.055)',
  glow: ['rgba(0, 116, 127, 0)', 'rgba(0, 148, 161, 0.018)', 'rgba(0, 193, 207, 0.075)', 'rgba(0, 193, 207, 0)']
});

const DEG = Math.PI / 180;
const MIN_DISTANCE = 1.58 * DEG;
const SOURCE_CELL = 1.15 * DEG;
const COAST_RADIUS = 1.95 * DEG;
const MIN_LOCAL_NEIGHBOURS = 4;
const MIN_COS = Math.cos(MIN_DISTANCE);
const COAST_COS = Math.cos(COAST_RADIUS);

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const wrapPi = (value) => {
  while (value > Math.PI) value -= Math.PI * 2;
  while (value < -Math.PI) value += Math.PI * 2;
  return value;
};

function hashPoint(lat, lon) {
  const a = Math.round((lat / DEG + 90) * 1000);
  const b = Math.round((lon / DEG + 180) * 1000);
  let x = (Math.imul(a, 374761393) + Math.imul(b, 668265263)) | 0;
  x = (x ^ (x >>> 13)) | 0;
  x = Math.imul(x, 1274126177) | 0;
  return (x ^ (x >>> 16)) >>> 0;
}

function bucketKey(latIndex, lonIndex) { return `${latIndex}:${lonIndex}`; }

function bucketPosition(point, cell, lonCells) {
  const latIndex = Math.floor((point.lat + Math.PI / 2) / cell);
  const lonIndex = ((Math.floor((point.lon + Math.PI) / cell) % lonCells) + lonCells) % lonCells;
  return [latIndex, lonIndex];
}

function vector(point) {
  const cosLat = Math.cos(point.lat);
  return [cosLat * Math.cos(point.lon), cosLat * Math.sin(point.lon), Math.sin(point.lat)];
}

function dot3(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }

export function decodeLandPoints(encoded) {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  const view = new DataView(bytes.buffer);
  const points = [];
  for (let offset = 0; offset + 3 < bytes.length; offset += 4) {
    const lat = view.getInt16(offset, true) / 100 * DEG;
    const lon = view.getInt16(offset + 2, true) / 100 * DEG;
    points.push({ lat, lon, v: vector({ lat, lon }) });
  }
  return points;
}

function buildBuckets(points, cell) {
  const lonCells = Math.max(24, Math.ceil(Math.PI * 2 / cell));
  const buckets = new Map();
  points.forEach((point, index) => {
    const [latIndex, lonIndex] = bucketPosition(point, cell, lonCells);
    const key = bucketKey(latIndex, lonIndex);
    const bucket = buckets.get(key);
    if (bucket) bucket.push(index); else buckets.set(key, [index]);
  });
  return { buckets, lonCells };
}

function localNeighbourCount(point, source, sourceGrid) {
  const [latIndex, lonIndex] = bucketPosition(point, SOURCE_CELL, sourceGrid.lonCells);
  let count = 0;
  for (let dLat = -2; dLat <= 2; dLat += 1) {
    for (let dLon = -3; dLon <= 3; dLon += 1) {
      const wrappedLon = (lonIndex + dLon + sourceGrid.lonCells) % sourceGrid.lonCells;
      const bucket = sourceGrid.buckets.get(bucketKey(latIndex + dLat, wrappedLon));
      if (!bucket) continue;
      for (const sourceIndex of bucket) {
        const candidate = source[sourceIndex];
        if (candidate === point) continue;
        if (dot3(point.v, candidate.v) >= COAST_COS) count += 1;
      }
    }
  }
  return count;
}

export function prepareLandPoints(encoded) {
  const source = decodeLandPoints(encoded);
  const sourceGrid = buildBuckets(source, SOURCE_CELL);
  const candidates = source
    .map((point) => ({ ...point, neighbours: localNeighbourCount(point, source, sourceGrid), hash: hashPoint(point.lat, point.lon) }))
    .filter((point) => point.neighbours >= MIN_LOCAL_NEIGHBOURS)
    .sort((a, b) => a.hash - b.hash);

  const cell = MIN_DISTANCE;
  const lonCells = Math.max(24, Math.ceil(Math.PI * 2 / cell));
  const acceptedBuckets = new Map();
  const accepted = [];
  for (const point of candidates) {
    const [latIndex, lonIndex] = bucketPosition(point, cell, lonCells);
    let blocked = false;
    for (let dLat = -2; dLat <= 2 && !blocked; dLat += 1) {
      for (let dLon = -3; dLon <= 3 && !blocked; dLon += 1) {
        const wrappedLon = (lonIndex + dLon + lonCells) % lonCells;
        const bucket = acceptedBuckets.get(bucketKey(latIndex + dLat, wrappedLon));
        if (!bucket) continue;
        for (const acceptedIndex of bucket) {
          if (dot3(point.v, accepted[acceptedIndex].v) > MIN_COS) { blocked = true; break; }
        }
      }
    }
    if (blocked) continue;
    const acceptedIndex = accepted.length;
    accepted.push(point);
    const key = bucketKey(latIndex, lonIndex);
    const bucket = acceptedBuckets.get(key);
    if (bucket) bucket.push(acceptedIndex); else acceptedBuckets.set(key, [acceptedIndex]);
  }
  return { sourceCount: source.length, points: accepted };
}

export function projectPoint(point, phi, theta) {
  const deltaLon = wrapPi(point.lon - phi);
  const sinLat = Math.sin(point.lat);
  const cosLat = Math.cos(point.lat);
  const sinDelta = Math.sin(deltaLon);
  const cosDelta = Math.cos(deltaLon);
  const sinCenter = Math.sin(theta);
  const cosCenter = Math.cos(theta);
  return {
    x: cosLat * sinDelta,
    y: cosCenter * sinLat - sinCenter * cosLat * cosDelta,
    z: sinCenter * sinLat + cosCenter * cosLat * cosDelta
  };
}

export function pointAppearance(z, size) {
  const edge = clamp((z - 0.01) / 0.23, 0, 1);
  const baseDot = Math.max(1.08, size / 500);
  return {
    alpha: (0.50 + 0.46 * z) * (0.60 + 0.40 * edge),
    radius: baseDot * (0.90 + 0.50 * z)
  };
}
