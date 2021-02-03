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
    global.command = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (usage, description, init, aliases) {
    if (Array.isArray(init)) {
      aliases = init;
      init = undefined;
    }
    if (aliases && Array.isArray(aliases)) {
      usage = [].concat([usage], aliases);
    }

    if (this.details.commands.filter(function (item) {
      return item.usage === usage;
    }).length === 0) {
      // Register command to global scope
      this.details.commands.push({
        usage: usage,
        description: description,
        init: typeof init === 'function' ? init : false
      });
    }

    // Allow chaining of .command()
    return this;
  };
});
//# sourceMappingURL=command.js.map