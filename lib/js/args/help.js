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
    global.help = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    var name = this.config.name;

    var firstBig = function firstBig(word) {
      return word.charAt(0).toUpperCase() + word.substr(1);
    };

    var parts = [];

    var groups = {
      options: true,
      examples: true
    };

    for (var group in groups) {
      if (this.details[group].length > 0) {
        continue; // eslint-disable-line
      }

      groups[group] = false;
    }

    var optionHandle = groups.options ? '[options] ' : '';
    var value = typeof this.config.value === 'string' ? ' ' + this.config.value : '';

    parts.push(['', 'Usage: ' + this.printMainColor(name) + ' ' + this.printSubColor(optionHandle + value), '']);

    for (var _group in groups) {
      if (!groups[_group]) {
        continue; // eslint-disable-line
      }

      parts.push(['', firstBig(_group) + ':', '', '']);

      if (_group === 'examples') {
        parts.push(this.generateExamples());
      } else {
        parts.push(this.generateDetails(_group));
      }

      parts.push(['', '']);
    }

    var output = '';

    // And finally, merge and output them
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var part = _step.value;

        output += part.join('\n  ');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!groups.options) {
      output = 'No options available';
    }

    var usageFilter = this.config.usageFilter;

    // If filter is available, pass usage information through

    if (typeof usageFilter === 'function') {
      output = usageFilter(output) || output;
    }

    console.log(output); // eslint-disable-line
  };
});
//# sourceMappingURL=help.js.map