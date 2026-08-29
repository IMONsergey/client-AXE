export const GLOBE_VIEW = Object.freeze({
  phi: 75 * Math.PI / 180,
  theta: 25 * Math.PI / 180
});

export const GLOBE_STYLE = Object.freeze({
  radiusRatio: 0.455,
  sphere: ['rgba(7, 94, 111, 0.94)', 'rgba(6, 82, 97, 0.97)', 'rgba(3, 48, 61, 0.995)'],
  dot: [42, 225, 241],
  outline: 'rgba(42, 225, 241, 0.07)',
  glow: ['rgba(0, 116, 127, 0)', 'rgba(0, 148, 161, 0.02)', 'rgba(0, 193, 207, 0.085)', 'rgba(0, 193, 207, 0)']
});

const DEG = Math.PI / 180;

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const wrapPi = (value) => {
  while (value > Math.PI) value -= Math.PI * 2;
  while (value < -Math.PI) value += Math.PI * 2;
  return value;
};

export function decodeLandPoints(encoded) {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  const view = new DataView(bytes.buffer);
  const points = [];

  for (let offset = 0; offset + 3 < bytes.length; offset += 4) {
    points.push({
      lat: view.getInt16(offset, true) / 100 * DEG,
      lon: view.getInt16(offset + 2, true) / 100 * DEG
    });
  }

  return points;
}

export function prepareLandPoints(encoded) {
  const points = decodeLandPoints(encoded);
  return { sourceCount: points.length, points };
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
  const baseDot = Math.max(0.92, size / 650);

  return {
    alpha: (0.62 + 0.42 * z) * (0.68 + 0.32 * edge),
    radius: baseDot * (0.94 + 0.42 * z)
  };
}
