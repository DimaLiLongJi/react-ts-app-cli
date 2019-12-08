const postcss = require('postcss');
const objectAssign = require('object-assign');

// excluding regex trick: http://www.rexegg.com/regex-best-trick.html
// Not anything inside double quotes
// Not anything inside single quotes
// Not anything inside url()
// Any digit followed by px
// !singlequotes|!doublequotes|!url()|pixelunit
const pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/ig;

const defaults = {
  viewportWidth: 750, // iphone6 的尺寸750px*1334px
  viewportHeight: 568, // not now used; TODO: need for different units and math for different properties
  unitPrecision: 5,
  viewportUnit: 'vw',
  selectorBlackList: [],
  minPixelValue: 1,
  mediaQuery: false, // 是否转换 media 中的条件
  addRem: true, // 是否需要转换成 rem
  remUnit: 46.875 // rem 根元素大小
};

module.exports = postcss.plugin('postcss-px-to-viewport', function (options) {

  const opts = objectAssign({}, defaults, options);
  const pxReplace = createPxReplace(opts.viewportWidth, opts.minPixelValue, opts.unitPrecision, opts.viewportUnit);
  const pxReplaceRem = createPxReplaceRem(opts.viewportWidth, opts.minPixelValue, opts.unitPrecision, opts.remUnit);

  return function (css) {

    css.walkDecls(function (decl, i) {
      // This should be the fastest test and will remove most declarations
      if (decl.value.indexOf('px') === -1) return;

      if (blacklistedSelector(opts.selectorBlackList, decl.parent.selector)) return;

      // rem
      if (opts.addRem) {
        const clone = decl.clone();
        clone.value = clone.value.replace(pxRegex, pxReplaceRem);
        decl.before(clone);
      }

      decl.value = decl.value.replace(pxRegex, pxReplace);
    });

    if (opts.mediaQuery) {
      css.walkAtRules('media', function (rule) {
        if (rule.params.indexOf('px') === -1) return;
        if (opts.addRem) {
          rule.params = rule.params.replace(pxRegex, pxReplaceRem);
        } else {
          rule.params = rule.params.replace(pxRegex, pxReplace);
        }
      });
    }

  };
});

function createPxReplace(viewportSize, minPixelValue, unitPrecision, viewportUnit) {
  return function (m, $1) {
    if (!$1) return m;
    const pixels = parseFloat($1);
    if (pixels <= minPixelValue) return m;
    return toFixed((pixels / viewportSize * 100), unitPrecision) + viewportUnit;
  };
}

function createPxReplaceRem(viewportSize, minPixelValue, unitPrecision, remUnit) {
  return function (m, $1) {
    if (!$1) return m;
    const pixels = parseFloat($1);
    if (pixels <= minPixelValue) return m;
    return toFixed((pixels / remUnit), unitPrecision) + 'rem';
  };
}

function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
}

function blacklistedSelector(blacklist, selector) {
  if (typeof selector !== 'string') return;
  return blacklist.some(function (regex) {
    if (typeof regex === 'string') return selector.indexOf(regex) !== -1;
    return selector.match(regex);
  });
}
