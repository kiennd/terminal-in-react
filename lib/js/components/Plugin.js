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
    global.Plugin = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var Plugin = (_temp = _class = function Plugin(api) {
    var _this = this;

    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Plugin);

    this.api = api;
    this.config = config;
    this.commands = {};
    this.descriptions = {};
    this.shortcuts = {};

    this.updateApi = function (newApi) {
      _this.api = newApi;
    };
    this.getPublicMethods = function () {
      return {};
    };
    this.readStdOut = function () {
      return true;
    };
  }, _class.displayName = '', _class.version = '1.0.0', _class.defaultData = '', _class.commands = {}, _class.descriptions = {}, _class.shortcuts = {}, _temp);
  exports.default = Plugin;
});
//# sourceMappingURL=Plugin.js.map