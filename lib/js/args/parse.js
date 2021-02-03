(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'minimist'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('minimist'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.minimist);
    global.parse = mod.exports;
  }
})(this, function (exports, _minimist) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (argv, options) {
    // Override default option values
    Object.assign(this.config, options);

    if (this.config.help) {
      // Register default options and commands
      this.option('help', 'Output usage information');
      this.command('help', 'Display help', this.showHelp);
    }

    // Parse arguments using minimist
    this.raw = (0, _minimist2.default)(argv.slice(1), this.config.minimist);

    // If default version is allowed, check for it
    if (this.config.version) {
      this.checkVersion(this.parent);
    }

    var subCommand = this.raw._[1];
    var helpTriggered = this.raw.h || this.raw.help;

    var args = {};
    var defined = this.isDefined(subCommand, 'commands');
    var optionList = this.getOptions(defined);

    Object.assign(args, this.raw);
    args._.shift();

    // Export sub arguments of command
    this.sub = args._;

    // If sub command is defined, run it
    if (defined) {
      this.runCommand(defined, optionList);
      return {};
    }

    // Show usage information if "help" or "h" option was used
    // And respect the option related to it
    if (this.config.help && helpTriggered) {
      this.showHelp();
    }

    // Hand back list of options
    return optionList;
  };

  var _minimist2 = _interopRequireDefault(_minimist);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});
//# sourceMappingURL=parse.js.map