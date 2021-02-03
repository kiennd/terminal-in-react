(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.option = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name, description, defaultValue, init) {
    var usage = [];

    var assignShort = function assignShort(n, options, short) {
      if (options.find(function (flagName) {
        return flagName.usage[0] === short;
      })) {
        short = n.charAt(0).toUpperCase(); // eslint-disable-line no-param-reassign
      }
      return [short, n];
    };

    // If name is an array, pick the values
    // Otherwise just use the whole thing
    switch (name.constructor) {
      case String:
        usage = assignShort(name, this.details.options, name.charAt(0));
        break;
      case Array:
        usage = usage.concat(name);
        break;
      default:
        throw new Error('Invalid name for option');
    }

    // Throw error if short option is too long
    if (usage.length > 0 && usage[0].length > 1) {
      throw new Error('Short version of option is longer than 1 char');
    }

    var optionDetails = {
      defaultValue: defaultValue,
      usage: usage,
      description: description
    };

    if (this.details.options.filter(function (item) {
      return item.usage[1] === usage[1];
    }).length === 0) {
      var defaultIsWrong = void 0;

      switch (defaultValue) {
        case false:
          defaultIsWrong = true;
          break;
        case null:
          defaultIsWrong = true;
          break;
        case undefined:
          defaultIsWrong = true;
          break;
        default:
          defaultIsWrong = false;
      }

      // Set initializer depending on type of default value
      if (!defaultIsWrong) {
        var initFunction = typeof init === 'function';
        optionDetails.init = initFunction ? init : this.handleType(defaultValue)[1];
      }

      // Register option to global scope
      this.details.options.push(optionDetails);
    }

    // Allow chaining of .option()
    return this;
  };
});
//# sourceMappingURL=option.js.map