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
  exports.Note = exports.ContainerWrapper = exports.Base = undefined;

  var _styledComponents2 = _interopRequireDefault(_styledComponents);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _templateObject = _taggedTemplateLiteral(['\n  width: 100%;\n  max-width: ', ';\n  height: ', ';\n  min-height: 630px;\n  max-height: 100vh;\n  text-align: initial;\n'], ['\n  width: 100%;\n  max-width: ', ';\n  height: ', ';\n  min-height: 630px;\n  max-height: 100vh;\n  text-align: initial;\n']),
      _templateObject2 = _taggedTemplateLiteral(['\n  height: 100%;\n  animation: fadeIn 0.18s ease-in;\n  color: ', ';\n  ', '\n'], ['\n  height: 100%;\n  animation: fadeIn 0.18s ease-in;\n  color: ', ';\n  ', '\n']),
      _templateObject3 = _taggedTemplateLiteral(['\n  0% {\n    opacity: 0;\n  }\n\n  60% {\n    opacity: 0.6;\n  }\n\n  100% {\n    opacity: 1;\n  }\n'], ['\n  0% {\n    opacity: 0;\n  }\n\n  60% {\n    opacity: 0.6;\n  }\n\n  100% {\n    opacity: 1;\n  }\n']),
      _templateObject4 = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  animation: ', ' 0.3s ease-in;\n'], ['\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  animation: ', ' 0.3s ease-in;\n']);

  function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  var Base = exports.Base = _styledComponents2.default.div(_templateObject, function (props) {
    return props.fullscreen ? '100%' : '600px';
  }, function (props) {
    return props.fullscreen ? '100%' : '630px';
  });

  var DEFAULT_FONT_STYLE = '\n  font-family: \'Inconsolata\', monospace;\n  font-size: 0.9em;\n  color: green;\n';

  var ContainerWrapper = exports.ContainerWrapper = _styledComponents2.default.div(_templateObject2, function (props) {
    return props.theme.color;
  }, DEFAULT_FONT_STYLE);

  var terminalFadeIn = (0, _styledComponents.keyframes)(_templateObject3);

  var Note = exports.Note = _styledComponents2.default.span(_templateObject4, terminalFadeIn);
});
//# sourceMappingURL=styled-elements.js.map