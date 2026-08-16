(() => {
  const NBSP = '\u00A0';
  const NNBSP = '\u202F';
  const NBHY = '\u2011';

  const shortWords = [
    'а', 'и', 'но', 'да', 'ли', 'же', 'бы',
    'в', 'во', 'на', 'к', 'ко', 'с', 'со', 'о', 'об', 'обо',
    'от', 'по', 'за', 'до', 'из', 'изо', 'у', 'не', 'ни',
    'для', 'при', 'под', 'над', 'без', 'про'
  ].join('|');

  const shortWordPattern = new RegExp(`(^|[\\s(«„])(${shortWords})\\s+(?=\\S)`, 'giu');

  function formatText(text) {
    return text
      .replace(/ПМЭФ-2025/g, `ПМЭФ${NBHY}2025`)
      .replace(/товарно-деривативных/giu, `товарно${NBHY}деривативных`)
      .replace(/(ЕАЭС\+|БРИКС\+)\s*,\s*/g, `$1,${NBSP}`)
      .replace(/\s+и\s+(ШОС\.?)/g, `${NBSP}и${NBSP}$1`)
      .replace(shortWordPattern, (_, prefix, word) => `${prefix}${word}${NBSP}`)
      .replace(/(\d)\s+(?=(?:%|₽|€|\$)\b)/g, `$1${NNBSP}`)
      .replace(/(\d)\s+(?=(?:бирж|стран|участниц|лет|год|года)\b)/giu, `$1${NBSP}`);
  }

  function processElement(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('svg, script, style')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      node.nodeValue = formatText(node.nodeValue);
    });
  }

  document.querySelectorAll('.typo').forEach(processElement);

  // Mobile keeps the visual language of the desktop metrics block: a real
  // modular grid with empty cells around the three highlighted values.
  // The desktop has seven columns; phones use three compact columns instead.
  const mobileMetricsStyle = document.createElement('style');
  mobileMetricsStyle.textContent = `
    @media (max-width: 680px) {
      .metrics {
        display: block !important;
        grid-template-columns: none !important;
      }

      .metric-row {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 0 !important;
      }

      .metric-row .metric-cell {
        display: none !important;
        min-height: 138px !important;
      }

      .metric-row:nth-child(1) .metric-cell:nth-child(1),
      .metric-row:nth-child(1) .metric-cell:nth-child(2),
      .metric-row:nth-child(1) .metric-cell:nth-child(3),
      .metric-row:nth-child(2) .metric-cell:nth-child(4),
      .metric-row:nth-child(2) .metric-cell:nth-child(5),
      .metric-row:nth-child(2) .metric-cell:nth-child(6),
      .metric-row:nth-child(3) .metric-cell:nth-child(2),
      .metric-row:nth-child(3) .metric-cell:nth-child(3),
      .metric-row:nth-child(3) .metric-cell:nth-child(4) {
        display: block !important;
      }

      .metric-row .metric-card {
        display: flex !important;
        min-height: 138px !important;
        gap: 14px !important;
        padding: 14px 8px !important;
      }

      .metric-row .metric-card strong {
        font-size: clamp(48px, 14vw, 58px) !important;
        line-height: .8 !important;
      }

      .metric-row .metric-label {
        font-size: 12px !important;
        line-height: 1.16 !important;
        max-width: 104px !important;
      }

      .metric-row .metric-card--blue .metric-label {
        max-width: 104px !important;
      }
    }

    @media (max-width: 380px) {
      .metric-row .metric-cell,
      .metric-row .metric-card {
        min-height: 126px !important;
      }

      .metric-row .metric-card strong {
        font-size: 46px !important;
      }

      .metric-row .metric-label {
        font-size: 11px !important;
      }
    }
  `;
  document.head.appendChild(mobileMetricsStyle);
})();
