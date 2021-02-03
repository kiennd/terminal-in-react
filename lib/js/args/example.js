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
    global.example = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (usage, description) {
    if (typeof usage !== 'string' || typeof description !== 'string') {
      throw new TypeError('Usage for adding an Example: args.example("usage", "description")');
    }
    this.details.examples.push({ usage: usage, description: description });

    return this;
  };
});
//# sourceMappingURL=example.js.map