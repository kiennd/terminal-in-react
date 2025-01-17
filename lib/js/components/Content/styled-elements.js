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
  exports.InputArea = exports.ContainerContent = exports.Holder = exports.MainInput = exports.Prompt = exports.Input = exports.PreOutputLine = exports.OutputLine = exports.ContainerMain = exports.Container = undefined;

  var _styledComponents2 = _interopRequireDefault(_styledComponents);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _templateObject = _taggedTemplateLiteral(['\n display: block;\n margin: 0 auto;\n'], ['\n display: block;\n margin: 0 auto;\n']),
      _templateObject2 = _taggedTemplateLiteral(['\n  max-width: 600px;\n  transition: all 0.4s ease-out;\n  background: ', ';\n  max-height: 600px;\n  height: 100%;\n  overflow: scroll;\n  position: relative;\n\n  &:focus {\n    outline: none;\n  }\n'], ['\n  max-width: 600px;\n  transition: all 0.4s ease-out;\n  background: ', ';\n  max-height: 600px;\n  height: 100%;\n  overflow: scroll;\n  position: relative;\n\n  &:focus {\n    outline: none;\n  }\n']),
      _templateObject3 = _taggedTemplateLiteral(['\n  font-family: \'Inconsolata\', monospace;\n  font-size: 0.9em;\n  color: ', ';\n  margin-top: 10px;\n  margin-bottom: 10px;\n  white-space: pre-wrap;\n'], ['\n  font-family: \'Inconsolata\', monospace;\n  font-size: 0.9em;\n  color: ', ';\n  margin-top: 10px;\n  margin-bottom: 10px;\n  white-space: pre-wrap;\n']),
      _templateObject4 = _taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  padding-top: 15px;\n  padding-bottom: 15px;\n'], ['\n  display: flex;\n  align-items: center;\n  padding-top: 15px;\n  padding-bottom: 15px;\n']),
      _templateObject5 = _taggedTemplateLiteral(['\n  color: ', ';\n'], ['\n  color: ', ';\n']),
      _templateObject6 = _taggedTemplateLiteral(['\n  font: inherit;\n  font-size: 0.9em;\n  &, &:focus{\n    border: none;\n    padding: 0;\n    margin: 3px;\n    background: ', ';\n    color: ', ';\n    flex: 1;\n    outline: none;\n   }\n'], ['\n  font: inherit;\n  font-size: 0.9em;\n  &, &:focus{\n    border: none;\n    padding: 0;\n    margin: 3px;\n    background: ', ';\n    color: ', ';\n    flex: 1;\n    outline: none;\n   }\n']),
      _templateObject7 = _taggedTemplateLiteral(['\n'], ['\n']),
      _templateObject8 = _taggedTemplateLiteral(['\n  padding: 5px 20px;\n  height: 100%;\n'], ['\n  padding: 5px 20px;\n  height: 100%;\n']),
      _templateObject9 = _taggedTemplateLiteral(['\n  height: 100%;\n  padding: 3px;\n'], ['\n  height: 100%;\n  padding: 3px;\n']);

  function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  var Container = exports.Container = _styledComponents2.default.div(_templateObject);

  var ContainerMain = exports.ContainerMain = Container.extend(_templateObject2, function (props) {
    return props.theme.backgroundColor;
  });

  var OutputLine = exports.OutputLine = _styledComponents2.default.div(_templateObject3, function (props) {
    return props.theme.outputColor || props.theme.color;
  });
  var PreOutputLine = exports.PreOutputLine = _styledComponents2.default.pre(_templateObject3, function (props) {
    return props.theme.outputColor || props.theme.color;
  });

  var Input = exports.Input = _styledComponents2.default.div(_templateObject4);

  var Prompt = exports.Prompt = _styledComponents2.default.span(_templateObject5, function (props) {
    return props.theme.prompt;
  });

  var MainInput = exports.MainInput = _styledComponents2.default.input(_templateObject6, function (props) {
    return props.theme.backgroundColor;
  }, function (props) {
    return props.theme.color;
  });

  var Holder = exports.Holder = _styledComponents2.default.div(_templateObject7);

  var ContainerContent = exports.ContainerContent = _styledComponents2.default.div(_templateObject8);

  var InputArea = exports.InputArea = _styledComponents2.default.div(_templateObject9);
});
//# sourceMappingURL=styled-elements.js.map