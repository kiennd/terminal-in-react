(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'styled-components'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('styled-components'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.styledComponents);
    global.styledElements = mod.exports;
  }
})(this, function (exports, _styledComponents) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TerminalTopBar = undefined;

  var _styledComponents2 = _interopRequireDefault(_styledComponents);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _templateObject = _taggedTemplateLiteral(['\n  height: 30px;\n  max-width: 600px;\n  transition: all 0.4s ease-out;\n  background: ', ';\n  display: block;\n  margin: 0 auto;\n'], ['\n  height: 30px;\n  max-width: 600px;\n  transition: all 0.4s ease-out;\n  background: ', ';\n  display: block;\n  margin: 0 auto;\n']);

  function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  var TerminalTopBar = exports.TerminalTopBar = _styledComponents2.default.div(_templateObject, function (props) {
    return props.theme.barColor;
  });
});
//# sourceMappingURL=styled-elements.js.map