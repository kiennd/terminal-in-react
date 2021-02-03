(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.propTypes);
    global.types = mod.exports;
  }
})(this, function (exports, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TerminalDefaultProps = exports.TerminalContextTypes = exports.TerminalPropTypes = exports.descriptionsPropType = exports.commandsPropType = undefined;

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var commandsPropType = exports.commandsPropType = _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.shape({
    options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      name: _propTypes2.default.string,
      description: _propTypes2.default.string,
      defaultValue: _propTypes2.default.any
    })),
    method: _propTypes2.default.func
  })]));

  var descriptionsPropType = exports.descriptionsPropType = _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]));

  var TerminalPropTypes = exports.TerminalPropTypes = {
    startState: _propTypes2.default.oneOf(['minimised', 'maximised', 'open', 'closed']),
    showActions: _propTypes2.default.bool,
    hideTopBar: _propTypes2.default.bool,
    allowTabs: _propTypes2.default.bool,
    msg: _propTypes2.default.string,
    closedTitle: _propTypes2.default.string,
    closedMessage: _propTypes2.default.string,
    color: _propTypes2.default.string,
    style: _propTypes2.default.object, // eslint-disable-line
    prompt: _propTypes2.default.string,
    barColor: _propTypes2.default.string,
    outputColor: _propTypes2.default.string,
    backgroundColor: _propTypes2.default.string,
    commands: commandsPropType,
    descriptions: descriptionsPropType,
    watchConsoleLogging: _propTypes2.default.bool,
    commandPassThrough: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.bool]),
    promptSymbol: _propTypes2.default.string,
    plugins: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.shape({
      class: _propTypes2.default.func,
      config: _propTypes2.default.object
    })])),
    shortcuts: _propTypes2.default.objectOf(_propTypes2.default.objectOf(_propTypes2.default.string)),
    actionHandlers: _propTypes2.default.shape({
      handleClose: _propTypes2.default.func,
      handleMinimise: _propTypes2.default.func,
      handleMaximise: _propTypes2.default.func
    }),
    afterChange: _propTypes2.default.func,
    commandWasRun: _propTypes2.default.func
  };

  var TerminalContextTypes = exports.TerminalContextTypes = {
    barShowing: _propTypes2.default.bool,
    tabsShowing: _propTypes2.default.bool,
    activeTab: _propTypes2.default.string,
    instances: _propTypes2.default.array,
    show: _propTypes2.default.bool,
    minimise: _propTypes2.default.bool,
    maximise: _propTypes2.default.bool,
    closeWindow: _propTypes2.default.func,
    openWindow: _propTypes2.default.func,
    minimiseWindow: _propTypes2.default.func,
    unminimiseWindow: _propTypes2.default.func,
    maximiseWindow: _propTypes2.default.func,
    unmaximiseWindow: _propTypes2.default.func,
    toggleShow: _propTypes2.default.func,
    toggleMaximise: _propTypes2.default.func,
    toggleMinimize: _propTypes2.default.func
  };

  var TerminalDefaultProps = exports.TerminalDefaultProps = {
    startState: 'open',
    hideTopBar: false,
    allowTabs: true,
    showActions: true,
    msg: '',
    closedTitle: 'OOPS! You closed the window.',
    closedMessage: 'Click on the icon to reopen.',
    color: 'green',
    style: {},
    prompt: 'green',
    barColor: 'black',
    backgroundColor: 'black',
    commands: {},
    descriptions: {},
    watchConsoleLogging: false,
    commandPassThrough: false,
    promptSymbol: '>',
    plugins: [],
    shortcuts: {}
  };
});
//# sourceMappingURL=types.js.map