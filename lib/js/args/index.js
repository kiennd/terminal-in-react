(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './parse', './example', './examples', './options', './option', './command', './help', './utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./parse'), require('./example'), require('./examples'), require('./options'), require('./option'), require('./command'), require('./help'), require('./utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.parse, global.example, global.examples, global.options, global.option, global.command, global.help, global.utils);
    global.index = mod.exports;
  }
})(this, function (module, exports, _parse, _example, _examples, _options, _option, _command, _help, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Args;

  var _parse2 = _interopRequireDefault(_parse);

  var _example2 = _interopRequireDefault(_example);

  var _examples2 = _interopRequireDefault(_examples);

  var _options2 = _interopRequireDefault(_options);

  var _option2 = _interopRequireDefault(_option);

  var _command2 = _interopRequireDefault(_command);

  var _help2 = _interopRequireDefault(_help);

  var _utils2 = _interopRequireDefault(_utils);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var publicMethods = {
    command: _command2.default,
    option: _option2.default,
    options: _options2.default,
    parse: _parse2.default,
    example: _example2.default,
    examples: _examples2.default,
    showHelp: _help2.default
  };

  function Args() {
    this.details = {
      commands: [],
      options: [],
      examples: []
    };

    // Configuration defaults
    this.config = {
      help: true,
      usageFilter: null,
      value: null,
      name: null,
      mainColor: 'yellow',
      subColor: 'dim'
    };

    this.printMainColor = function (i) {
      return i;
    };
    this.printSubColor = function (i) {
      return i;
    };

    this.parent = module.parent;
  }

  // Assign internal helpers
  for (var util in _utils2.default) {
    if (!{}.hasOwnProperty.call(_utils2.default, util)) {
      continue; // eslint-disable-line
    }

    Args.prototype[util] = _utils2.default[util];
  }

  // Assign public methods
  for (var method in publicMethods) {
    if (!{}.hasOwnProperty.call(publicMethods, method)) {
      continue; // eslint-disable-line
    }

    Args.prototype[method] = publicMethods[method];
  }
});
//# sourceMappingURL=index.js.map