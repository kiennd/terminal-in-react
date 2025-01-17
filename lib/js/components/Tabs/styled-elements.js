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
  exports.TabPlus = exports.Tab = exports.TabClose = exports.TabBarEmpty = exports.TabBar = undefined;

  var _styledComponents2 = _interopRequireDefault(_styledComponents);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _templateObject = _taggedTemplateLiteral(['\n  height: 30px;\n  max-width: 600px;\n  transition: all 0.4s ease-out;\n  background: #222;\n  display: flex;\n  margin: 0 auto;\n'], ['\n  height: 30px;\n  max-width: 600px;\n  transition: all 0.4s ease-out;\n  background: #222;\n  display: flex;\n  margin: 0 auto;\n']),
      _templateObject2 = _taggedTemplateLiteral(['\n  display: inline-block;\n  min-width: 25px;\n  height: 100%;\n  flex: 1;\n'], ['\n  display: inline-block;\n  min-width: 25px;\n  height: 100%;\n  flex: 1;\n']),
      _templateObject3 = _taggedTemplateLiteral(['\n  position: absolute;\n  top: 8px;\n  height: 13px;\n  line-height: 11px;\n  right: 3px;\n  font-size: 11px;\n  width: 13px;\n  text-align: center;\n  color: black;\n  cursor: pointer;\n\n  &:hover {\n    color: white;\n    background-color: black;\n    border-radius: 50%;\n  }\n'], ['\n  position: absolute;\n  top: 8px;\n  height: 13px;\n  line-height: 11px;\n  right: 3px;\n  font-size: 11px;\n  width: 13px;\n  text-align: center;\n  color: black;\n  cursor: pointer;\n\n  &:hover {\n    color: white;\n    background-color: black;\n    border-radius: 50%;\n  }\n']),
      _templateObject4 = _taggedTemplateLiteral(['\n  display: inline-block;\n  vertical-align: top;\n  height: 30px;\n  background-color: #333;\n  border-bottom: 2px solid #333;\n  border-bottom-color: ', '\n  text-align: center;\n  line-height: 30px;\n  width: 100px;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding-left: 3px;\n  padding-right: 3px;\n  cursor: pointer;\n  white-space: pre;\n  position: relative;\n  text-align: center;\n  &:focus {\n    outline: none;\n  }\n'], ['\n  display: inline-block;\n  vertical-align: top;\n  height: 30px;\n  background-color: #333;\n  border-bottom: 2px solid #333;\n  border-bottom-color: ', '\n  text-align: center;\n  line-height: 30px;\n  width: 100px;\n  box-sizing: border-box;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding-left: 3px;\n  padding-right: 3px;\n  cursor: pointer;\n  white-space: pre;\n  position: relative;\n  text-align: center;\n  &:focus {\n    outline: none;\n  }\n']),
      _templateObject5 = _taggedTemplateLiteral(['\n  display: inline-block;\n  color: white;\n  border: 1px solid white;\n  border-radius: 2px;\n  width: 13px;\n  height: 13px;\n  line-height: 13px;\n  margin-left: 5px;\n  margin-top: 8px;\n  text-align: center;\n  font-size: 12px;\n  cursor: pointer;\n  opacity: ', ';\n  transition: opacity 0.3s;\n'], ['\n  display: inline-block;\n  color: white;\n  border: 1px solid white;\n  border-radius: 2px;\n  width: 13px;\n  height: 13px;\n  line-height: 13px;\n  margin-left: 5px;\n  margin-top: 8px;\n  text-align: center;\n  font-size: 12px;\n  cursor: pointer;\n  opacity: ', ';\n  transition: opacity 0.3s;\n']);

  function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  var TabBar = exports.TabBar = _styledComponents2.default.div(_templateObject);

  var TabBarEmpty = exports.TabBarEmpty = _styledComponents2.default.div(_templateObject2);

  var TabClose = exports.TabClose = _styledComponents2.default.div(_templateObject3);

  var Tab = exports.Tab = _styledComponents2.default.div(_templateObject4, function (props) {
    return props.active ? '#777' : '#333';
  });

  var TabPlus = exports.TabPlus = _styledComponents2.default.div(_templateObject5, function (props) {
    return props.visible ? '0.7' : '0';
  });
});
//# sourceMappingURL=styled-elements.js.map