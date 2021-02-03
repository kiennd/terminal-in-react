(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash.camelcase', 'string-similarity'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash.camelcase'), require('string-similarity'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.lodash, global.stringSimilarity);
    global.utils = mod.exports;
  }
})(this, function (exports, _lodash, _stringSimilarity) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lodash2 = _interopRequireDefault(_lodash);

  var _stringSimilarity2 = _interopRequireDefault(_stringSimilarity);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  exports.default = {
    handleType: function handleType(value) {
      var type = value;
      if (typeof value !== 'function') {
        type = value.constructor;
      }

      // Depending on the type of the default value,
      // select a default initializer function
      switch (type) {
        case String:
          return ['[value]'];
        case Array:
          return ['<list>'];
        case Number:
        case parseInt:
          return ['<n>', parseInt];
        default:
          return [''];
      }
    },
    readOption: function readOption(option) {
      var value = option.defaultValue;
      var contents = {};

      // If option has been used, get its value
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = option.usage[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;

          var fromArgs = this.raw[name];
          if (typeof fromArgs !== 'undefined') {
            value = fromArgs;
          }
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

      var count = -1;
      // Process the option's value
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = option.usage[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _name = _step2.value;

          count += 1;
          var propVal = value;

          // Convert the value to an array when the option is called just once
          if (Array.isArray(option.defaultValue) && (typeof propVal === 'undefined' ? 'undefined' : _typeof(propVal)) !== _typeof(option.defaultValue)) {
            if (count === 0) {
              this.raw._.push(propVal);
            }
            propVal = [propVal];
          }

          if (typeof option.defaultValue !== 'undefined' && (typeof propVal === 'undefined' ? 'undefined' : _typeof(propVal)) !== _typeof(option.defaultValue)) {
            if (count === 0) {
              this.raw._.push(propVal);
            }
            propVal = option.defaultValue;
          }

          var condition = true;

          if (option.init) {
            // Only use the toString initializer if value is a number
            if (option.init === toString) {
              condition = propVal.constructor === Number;
            }

            if (condition) {
              // Pass it through the initializer
              propVal = option.init(propVal);
            }
          }

          // Camelcase option name (skip short flag)
          if (_name.length > 1) {
            _name = (0, _lodash2.default)(_name);
          }

          // Add option to list
          contents[_name] = propVal;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return contents;
    },
    getOptions: function getOptions(definedSubcommand) {
      var _this = this;

      var options = {};
      var args = {};

      // Set option defaults
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.details.options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _option = _step3.value;

          if (typeof _option.defaultValue === 'undefined') {
            continue; // eslint-disable-line
          }

          Object.assign(options, this.readOption(_option));
        }

        // Copy over the arguments
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      Object.assign(args, this.raw);
      var _ = [].concat(_toConsumableArray(args._));
      delete args._;

      // Override defaults if used in command line
      for (var option in args) {
        if (!{}.hasOwnProperty.call(args, option)) {
          continue; // eslint-disable-line
        }
        var related = this.isDefined(option, 'options');

        if (related) {
          var details = this.readOption(related);
          Object.assign(options, details);
        }

        if (!related && !definedSubcommand) {
          (function () {
            // Unknown Option
            var availableOptions = [];
            _this.details.options.forEach(function (opt) {
              availableOptions.push.apply(availableOptions, _toConsumableArray(opt.usage));
            });

            var suggestOption = _stringSimilarity2.default.findBestMatch(option, availableOptions);

            console.log('The option "' + option + '" is unknown.'); // eslint-disable-line

            if (suggestOption.bestMatch.rating >= 0.5) {
              console.log(' Did you mean the following one?\n'); // eslint-disable-line

              var suggestion = _this.details.options.filter(function (item) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                  for (var _iterator4 = item.usage[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var flag = _step4.value;

                    if (flag === suggestOption.bestMatch.target) {
                      return true;
                    }
                  }
                } catch (err) {
                  _didIteratorError4 = true;
                  _iteratorError4 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                      _iterator4.return();
                    }
                  } finally {
                    if (_didIteratorError4) {
                      throw _iteratorError4;
                    }
                  }
                }

                return false;
              });

              console.log(_this.generateDetails(suggestion)[0].trim() + '\n'); // eslint-disable-line
            } else {
              console.log(' Here\'s a list of all available options: \n'); // eslint-disable-line
              _this.showHelp();
            }
          })();
        }
      }

      options._ = _;
      return options;
    },
    generateExamples: function generateExamples() {
      var examples = this.details.examples;

      var parts = [];

      for (var item in examples) {
        if (!{}.hasOwnProperty.call(examples, item)) {
          continue; // eslint-disable-line
        }
        var usage = this.printSubColor('$ ' + examples[item].usage);
        var description = this.printMainColor('- ' + examples[item].description);
        parts.push('  ' + description + '\n\n    ' + usage + '\n\n');
      }

      return parts;
    },
    generateDetails: function generateDetails(kind) {
      // Get all properties of kind from global scope
      var items = typeof kind === 'string' ? [].concat(_toConsumableArray(this.details[kind])) : [].concat(_toConsumableArray(kind));
      var parts = [];
      var isCmd = kind === 'commands';

      // Sort items alphabetically
      items.sort(function (a, b) {
        var first = isCmd ? a.usage : a.usage[1];
        var second = isCmd ? b.usage : b.usage[1];

        switch (true) {
          case first < second:
            return -1;
          case first > second:
            return 1;
          default:
            return 0;
        }
      });

      for (var item in items) {
        if (!{}.hasOwnProperty.call(items, item)) {
          continue; // eslint-disable-line
        }

        var usage = items[item].usage;

        var initial = items[item].defaultValue;

        // If usage is an array, show its contents
        if (usage.constructor === Array) {
          if (isCmd) {
            usage = usage.join(', ');
          } else {
            var isVersion = usage.indexOf('v');
            usage = '-' + usage[0] + ', --' + usage[1];

            if (!initial) {
              initial = items[item].init;
            }

            usage += initial && isVersion === -1 ? ' ' + this.handleType(initial)[0] : '';
          }
        }

        // Overwrite usage with readable syntax
        items[item].usage = usage;
      }

      // Find length of longest option or command
      // Before doing that, make a copy of the original array
      var longest = items.slice().sort(function (a, b) {
        return b.usage.length - a.usage.length;
      })[0].usage.length;

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _item = _step5.value;
          var usage = _item.usage,
              description = _item.description;
          var defaultValue = _item.defaultValue;

          var difference = longest - usage.length;

          // Compensate the difference to longest property with spaces
          usage += ' '.repeat(difference);

          // Add some space around it as well
          if (typeof defaultValue !== 'undefined') {
            if (typeof defaultValue === 'boolean') {
              description += ' (' + (defaultValue ? 'enabled' : 'disabled') + ' by default)';
            } else {
              description += ' (defaults to ' + JSON.stringify(defaultValue) + ')';
            }
          }
          parts.push('  ' + this.printMainColor(usage) + '  ' + this.printSubColor(description));
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return parts;
    },
    runCommand: function runCommand(details, options) {
      // If help is disabled, remove initializer
      if (details.usage === 'help' && !this.config.help) {
        details.init = false; // eslint-disable-line
      }

      // If command has initializer, call it
      if (details.init) {
        var sub = [].concat(this.sub);
        sub.shift();

        return details.init.bind(this)(details.usage, sub, options);
      }

      return '';
    },
    isDefined: function isDefined(name, list) {
      // Get all items of kind
      var children = this.details[list];

      // Check if a child matches the requested name
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = children[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var child = _step6.value;
          var usage = child.usage;

          var type = usage.constructor;

          if (type === Array && usage.indexOf(name) > -1) {
            return child;
          }

          if (type === String && usage === name) {
            return child;
          }
        }

        // If nothing matches, item is not defined
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return false;
    }
  };
});
//# sourceMappingURL=utils.js.map