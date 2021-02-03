(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-object-inspector', 'platform'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-object-inspector'), require('platform'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.reactObjectInspector, global.platform);
    global.utils = mod.exports;
  }
})(this, function (exports, _react, _reactObjectInspector, _platform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.handleLogging = handleLogging;
  exports.isServer = isServer;
  exports.getOs = getOs;

  var _react2 = _interopRequireDefault(_react);

  var _reactObjectInspector2 = _interopRequireDefault(_reactObjectInspector);

  var _platform2 = _interopRequireDefault(_platform);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  // Capture the console.log calls (hijacking)
  (function setOldLogger() {
    console['oldLog'] = console['log']; // eslint-disable-line dot-notation
  })();

  // Handle console logging
  // eslint-disable-next-line import/prefer-default-export
  function handleLogging(method, addToOutput) {
    // eslint-disable-next-line no-console
    console[method] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      try {
        var _console;

        (_console = console).oldLog.apply(_console, ['[' + method + ']'].concat(args));
      } catch (e) {
        throw new Error('Terminal was loaded more than once check script tags');
      }
      var res = [].concat(args).slice(0, 15).map(function (arg, i) {
        switch (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) {
          case 'object':
            return _react2.default.createElement(_reactObjectInspector2.default, { data: arg, key: 'object-' + i });
          case 'function':
            return '' + arg;
          default:
            return arg;
        }
      });
      addToOutput(res);
    };
    Object.defineProperty(console[method], 'name', { value: method, writable: false }); // eslint-disable-line no-console
  }

  function isServer() {
    return !(typeof window !== 'undefined' && window.document);
  }

  var linuxPlatforms = ['Ubuntu', 'Debian', 'Fedora', 'Red Hat', 'SuSE', 'Android'];
  var darwinPlatforms = ['OS X', 'iOS'];

  function getOs() {
    var os = _platform2.default.os;

    if (os.family !== null && os.family.indexOf('Windows') === 0) {
      return 'win';
    }
    if (os.family !== null && linuxPlatforms.indexOf(os.family) > -1) {
      return 'linux';
    }
    if (os.family !== null && darwinPlatforms.indexOf(os.family) > -1) {
      return 'darwin';
    }
    return 'unknown';
  }
});
//# sourceMappingURL=utils.js.map