(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../../args/index', '../../utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../../args/index'), require('../../utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index, global.utils);
    global.terminalUtils = mod.exports;
  }
})(this, function (exports, _index, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.os = undefined;
  exports.pluginMap = pluginMap;
  exports.uuidv4 = uuidv4;
  exports.getShortcuts = getShortcuts;
  exports.modCommands = modCommands;

  var _index2 = _interopRequireDefault(_index);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var os = exports.os = (0, _utils.getOs)();

  function pluginMap(plugins, eachHandler) {
    return plugins.map(function (plugin) {
      if (typeof plugin === 'function') {
        plugin = {
          class: plugin,
          config: undefined
        };
      }
      return plugin;
    }).forEach(function (pluginObj) {
      return eachHandler(pluginObj.class, pluginObj.config);
    });
  }

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0; // eslint-disable-line no-bitwise
      var v = c === 'x' ? r : r & 0x3 | 0x8; // eslint-disable-line
      return v.toString(16);
    });
  }

  function getShortcuts(shortcuts, obj) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
      Object.keys(obj).forEach(function (key) {
        var split = key.toLowerCase().replace(/\s/g, '').split(',');
        split.forEach(function (osName) {
          if (osName === os) {
            shortcuts = _extends({}, shortcuts, obj[key]);
          }
        });
      });
    }
    return shortcuts;
  }

  function modCommands(commands) {
    var newCommands = {};

    Object.keys(commands).forEach(function (name) {
      var needsInstance = false;
      var definition = commands[name];
      var method = definition;
      var parse = function parse(i) {
        return i;
      };
      if (typeof definition !== 'undefined') {
        if ((typeof definition === 'undefined' ? 'undefined' : _typeof(definition)) === 'object') {
          var cmd = new _index2.default();
          if (typeof definition.options !== 'undefined') {
            try {
              cmd.options(definition.options);
            } catch (e) {
              throw new Error('options for command wrong format');
            }
          }
          parse = function parse(i) {
            return cmd.parse(i, {
              name: name,
              help: true,
              version: false
            });
          };
          method = definition.method; // eslint-disable-line
          needsInstance = definition.needsInstance || false;
        }

        newCommands[name] = {
          parse: parse,
          method: method,
          needsInstance: needsInstance
        };
      }
    });

    return newCommands;
  }
});
//# sourceMappingURL=terminal-utils.js.map