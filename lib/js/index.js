(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'styled-components', './components/Terminal', './components/Plugin'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('styled-components'), require('./components/Terminal'), require('./components/Plugin'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.styledComponents, global.Terminal, global.Plugin);
    global.index = mod.exports;
  }
})(this, function (exports, _styledComponents, _Terminal, _Plugin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PluginBase = undefined;

  var _Terminal2 = _interopRequireDefault(_Terminal);

  var _Plugin2 = _interopRequireDefault(_Plugin);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _templateObject = _taggedTemplateLiteral(['\n/* vietnamese */\n@font-face {\n  font-family: \'Inconsolata\';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\'Inconsolata Regular\'), local(\'Inconsolata-Regular\'), url(https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCNDiNsR5a-9Oe_Ivpu8XWlY.woff2) format(\'woff2\');\n  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: \'Inconsolata\';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\'Inconsolata Regular\'), local(\'Inconsolata-Regular\'), url(https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCKE8kM4xWR1_1bYURRojRGc.woff2) format(\'woff2\');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: \'Inconsolata\';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\'Inconsolata Regular\'), local(\'Inconsolata-Regular\'), url(https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCIgp9Q8gbYrhqGlRav_IXfk.woff2) format(\'woff2\');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n'], ['\n/* vietnamese */\n@font-face {\n  font-family: \'Inconsolata\';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\'Inconsolata Regular\'), local(\'Inconsolata-Regular\'), url(https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCNDiNsR5a-9Oe_Ivpu8XWlY.woff2) format(\'woff2\');\n  unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: \'Inconsolata\';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\'Inconsolata Regular\'), local(\'Inconsolata-Regular\'), url(https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCKE8kM4xWR1_1bYURRojRGc.woff2) format(\'woff2\');\n  unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: \'Inconsolata\';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\'Inconsolata Regular\'), local(\'Inconsolata-Regular\'), url(https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCIgp9Q8gbYrhqGlRav_IXfk.woff2) format(\'woff2\');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n']);

  function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  // eslint-disable-next-line
  (0, _styledComponents.injectGlobal)(_templateObject);

  exports.default = _Terminal2.default;
  exports.PluginBase = _Plugin2.default;
});
//# sourceMappingURL=index.js.map