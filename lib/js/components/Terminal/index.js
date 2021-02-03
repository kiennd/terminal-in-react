(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'string-similarity', 'whatkey', 'lodash.isequal', 'styled-components', '../../utils', '../types', './terminal-utils', './styled-elements', '../Bar', '../Content/index', '../Tabs/index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('string-similarity'), require('whatkey'), require('lodash.isequal'), require('styled-components'), require('../../utils'), require('../types'), require('./terminal-utils'), require('./styled-elements'), require('../Bar'), require('../Content/index'), require('../Tabs/index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.stringSimilarity, global.whatkey, global.lodash, global.styledComponents, global.utils, global.types, global.terminalUtils, global.styledElements, global.Bar, global.index, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _stringSimilarity, _whatkey2, _lodash, _styledComponents, _utils, _types, _terminalUtils, _styledElements, _Bar, _index, _index3) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _stringSimilarity2 = _interopRequireDefault(_stringSimilarity);

  var _whatkey3 = _interopRequireDefault(_whatkey2);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _Bar2 = _interopRequireDefault(_Bar);

  var _index2 = _interopRequireDefault(_index);

  var _index4 = _interopRequireDefault(_index3);

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var _class, _temp;

  function compLogic(comp) {
    switch (comp) {
      case '>':
        return function (a, b) {
          return parseInt(a, 10) > parseInt(b, 10);
        };
      case '<':
        return function (a, b) {
          return parseInt(a, 10) < parseInt(b, 10);
        };
      case '>=':
        return function (a, b) {
          return parseInt(a, 10) >= parseInt(b, 10);
        };
      case '<=':
        return function (a, b) {
          return parseInt(a, 10) <= parseInt(b, 10);
        };
      case '!=':
        return function (a, b) {
          return a !== b;
        };
      case '=':
      default:
        return function (a, b) {
          return a === b;
        };
    }
  }

  function putCursorAtEnd(el) {
    // Only focus if input isn't already
    if (document.activeElement !== el) {
      el.focus();
    }

    // If this function exists... (IE 9+)
    if (el.setSelectionRange) {
      // Double the length because Opera is inconsistent about whether a carriage
      // return is one character or two.
      var len = el.value.length * 2;

      // Timeout seems to be required for Blink
      setTimeout(function () {
        el.setSelectionRange(len, len);
      }, 1);
    } else {
      // As a fallback, replace the contents with itself
      // Doesn't work in Chrome, but Chrome supports setSelectionRange
      el.value = el.value;
    }
  }

  var Terminal = (_temp = _class = function (_Component) {
    _inherits(Terminal, _Component);

    function Terminal(props) {
      _classCallCheck(this, Terminal);

      var _this = _possibleConstructorReturn(this, (Terminal.__proto__ || Object.getPrototypeOf(Terminal)).call(this, props));

      _this.componentWillMount = function () {
        _this.loadPlugins();
        _this.assembleCommands();
        _this.setDescriptions();
        _this.setShortcuts();

        _this.createTab(true);
      };

      _this.componentDidMount = function () {
        if (_this.props.watchConsoleLogging) {
          _this.watchConsoleLogging();
        }
      };

      _this.createTab = function () {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var _this$props = _this.props,
            allowTabs = _this$props.allowTabs,
            promptSymbol = _this$props.promptSymbol;

        if (force || allowTabs) {
          var tabs = _this.state.tabs;

          var id = (0, _terminalUtils.uuidv4)();

          tabs.push(_react2.default.createElement(_index2.default, {
            key: id,
            id: id,
            prompt: promptSymbol,
            handleChange: _this.handleChange,
            handlerKeyPress: _this.handlerKeyPress,
            register: function register() {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              return _this.registerInstance.apply(_this, [id].concat(args));
            }
          }));

          _this.setState({ activeTab: id, tabs: tabs });
        }
      };

      _this.removeTab = function (index) {
        var tabs = _this.state.tabs;

        tabs.splice(index, 1);
        _this.setState({ tabs: tabs });
      };

      _this.getAppContent = function () {
        var _this$state = _this.state,
            show = _this$state.show,
            minimise = _this$state.minimise;

        if (!show) {
          return _this.getNote();
        }
        if (minimise) {
          return _this.getBar();
        }
        return _this.getContent();
      };

      _this.getContent = function () {
        var _this$props2 = _this.props,
            color = _this$props2.color,
            style = _this$props2.style,
            showActions = _this$props2.showActions,
            hideTopBar = _this$props2.hideTopBar,
            allowTabs = _this$props2.allowTabs,
            actionHandlers = _this$props2.actionHandlers;
        var _this$state2 = _this.state,
            activeTab = _this$state2.activeTab,
            tabs = _this$state2.tabs;

        var baseStyle = {
          height: '100%',
          color: color || 'green',
          animation: 'fadeIn 0.18s ease-in',
          fontFamily: "'Inconsolata', monospace",
          fontSize: '0.9em'
        };
        // This should be a syled component but breaks if it is...
        return _react2.default.createElement(
          'div',
          { style: _extends({}, baseStyle, style) },
          !hideTopBar && _react2.default.createElement(_Bar2.default, _extends({ showActions: showActions }, actionHandlers)),
          allowTabs && _react2.default.createElement(_index4.default, {
            active: activeTab,
            setActiveTab: _this.setActiveTab,
            createTab: _this.createTab,
            removeTab: _this.removeTab
          }),
          tabs
        );
      };

      _this.getBar = function () {
        var _this$props3 = _this.props,
            style = _this$props3.style,
            showActions = _this$props3.showActions,
            actionHandlers = _this$props3.actionHandlers;


        return _react2.default.createElement(
          _styledElements.ContainerWrapper,
          { style: _extends({}, style) },
          _react2.default.createElement(_Bar2.default, _extends({
            showActions: showActions
          }, actionHandlers))
        );
      };

      _this.getNote = function () {
        return _react2.default.createElement(
          _styledElements.Note,
          null,
          _react2.default.createElement(
            'h1',
            null,
            _this.props.closedTitle
          ),
          _react2.default.createElement('img', {
            src: 'https://camo.githubusercontent.com/95ad3fffa11193f85dedbf14ca67e4c5c07182d0/687474703a2f2f69636f6e732e69636f6e617263686976652e636f6d2f69636f6e732f70616f6d656469612f736d616c6c2d6e2d666c61742f313032342f7465726d696e616c2d69636f6e2e706e67',
            width: '200',
            height: '200',
            alt: 'note',
            onKeyPress: _this.toggleState('show'),
            onClick: _this.toggleState('show')
          }),
          _this.props.closedMessage
        );
      };

      _this.getPluginData = function (name) {
        return _this.pluginData[name];
      };

      _this.setPluginData = function (name, data) {
        _this.pluginData[name] = data;
      };

      _this.setDescriptions = function () {
        var descriptions = _extends({}, _this.defaultDesciptions, _this.props.descriptions);
        (0, _terminalUtils.pluginMap)(_this.props.plugins, function (plugin) {
          if (plugin.descriptions) {
            descriptions = _extends({}, descriptions, plugin.descriptions);
          }
        });
        _this.setState({ descriptions: descriptions });
      };

      _this.setShortcuts = function () {
        var shortcuts = (0, _terminalUtils.getShortcuts)({}, _this.defaultShortcuts);
        shortcuts = (0, _terminalUtils.getShortcuts)(shortcuts, _this.props.shortcuts);
        (0, _terminalUtils.pluginMap)(_this.props.plugins, function (plugin) {
          if (plugin.shortcuts) {
            shortcuts = (0, _terminalUtils.getShortcuts)(shortcuts, plugin.shortcuts);
          }
        });
        _this.setState({ shortcuts: shortcuts });
      };

      _this.setPromptPrefix = function (instance, promptPrefix) {
        if (instance.state.controller === null) {
          instance.setState({ promptPrefix: promptPrefix });
        }
      };

      _this.setPromptSymbol = function (instance, prompt) {
        if (instance.state.controller === null) {
          instance.setState({ prompt: prompt });
        }
      };

      _this.setActiveTab = function (activeTab) {
        _this.setState({ activeTab: activeTab });
      };

      _this.setFalse = function (name) {
        return function () {
          return _this.setState(_defineProperty({}, name, false));
        };
      };

      _this.setTrue = function (name) {
        return function () {
          return _this.setState(_defineProperty({}, name, true));
        };
      };

      _this.setValueWithHistory = function (instance, position, inputRef) {
        var history = instance.state.history;

        if (history[position]) {
          instance.setState({ historyCounter: position });
          inputRef.value = history[position];
          putCursorAtEnd(inputRef);
        }
      };

      _this.checkVersion = function (comp, ver) {
        if (ver === '*') {
          return true;
        }
        if (!/^(\d|\.)+$/.test(ver)) {
          throw new Error('Version can only have numbers and periods');
        } else {
          var clean = ver.toLowerCase().replace(/x/g, '0');
          if (clean[clean.length - 1] === '.') {
            clean += '0';
          }
          var split = clean.split('.');
          while (split.length < 3) {
            split.push('0');
          }
          var realSplit = Terminal.version.split('.');
          var checkBools = split.map(function (val, index) {
            return compLogic(comp)(realSplit[index], val);
          });
          return checkBools.indexOf(false) < 0;
        }
      };

      _this.registerInstance = function (index, instance) {
        var instances = _this.state.instances;

        var pluginInstances = {};
        var pluginMethods = {};

        var old = instances.find(function (i) {
          return i.index === index;
        });

        (0, _terminalUtils.pluginMap)(_this.props.plugins, function (PluginClass, config) {
          try {
            var api = {
              printLine: _this.printLine.bind(_this, instance),
              removeLine: _this.removeLine.bind(_this, instance),
              runCommand: _this.runCommand.bind(_this, instance),
              setCanScroll: _this.setCanScroll.bind(_this, instance),
              setScrollPosition: _this.setScrollPosition.bind(_this, instance),
              focusInput: _this.focusInput.bind(_this, instance),
              setPromptPrefix: _this.setPromptPrefix.bind(_this, instance),
              setPromptSymbol: _this.setPromptSymbol.bind(_this, instance),
              getPluginMethod: _this.getPluginMethod.bind(_this, instance),
              takeControl: _this.pluginTakeControl.bind(_this, instance),
              releaseControl: _this.pluginReleaseControl.bind(_this, instance),
              getData: function getData() {
                return _this.getPluginData(PluginClass.displayName);
              },
              setData: function setData(data) {
                return _this.setPluginData(PluginClass.displayName, data);
              },
              checkVersion: _this.checkVersion.bind(_this),
              version: Terminal.version,
              os: _terminalUtils.os
            };

            var plugin = void 0;
            if (old) {
              old.pluginInstances[PluginClass.displayName].updateApi(api);
            } else {
              plugin = new PluginClass(api, config);
              pluginMethods[PluginClass.displayName] = _extends({}, plugin.getPublicMethods(), {
                _getName: function _getName() {
                  return PluginClass.displayName;
                },
                _getVersion: function _getVersion() {
                  return PluginClass.version;
                }
              });
            }

            pluginInstances[PluginClass.displayName] = plugin;
          } catch (e) {
            console.error('Error instantiating plugin ' + PluginClass.displayName, e); // eslint-disable-line no-console
          }
        });

        var data = {
          index: index,
          instance: instance,
          pluginMethods: old ? old.pluginMethods : pluginMethods,
          pluginInstances: old ? old.pluginInstances : pluginInstances
        };

        if (old) {
          var realIndex = instances.indexOf(old);
          instances[realIndex] = data;
        } else {
          instances.push(data);
        }

        _this.setState({ instances: instances });

        return function () {
          var insts = _this.state.instances;
          _this.setState({
            instances: insts.filter(function (i) {
              return !(0, _lodash2.default)(i.instance, instance);
            })
          });
        };
      };

      _this.pluginTakeControl = function (instance, controller, newPrompt, newPromptPrefix) {
        var _instance$state = instance.state,
            promptPrefix = _instance$state.promptPrefix,
            prompt = _instance$state.prompt;

        instance.setState({
          controller: controller,
          prompt: typeof newPrompt === 'undefined' ? prompt : newPrompt,
          promptPrefix: typeof newPromptPrefix === 'undefined' ? promptPrefix : newPromptPrefix,
          oldPrefix: promptPrefix,
          oldPrompt: prompt
        });
      };

      _this.pluginReleaseControl = function (instance) {
        var _instance$state2 = instance.state,
            oldPrefix = _instance$state2.oldPrefix,
            oldPrompt = _instance$state2.oldPrompt;

        instance.setState({ controller: null, promptPrefix: oldPrefix, prompt: oldPrompt });
      };

      _this.toggleState = function (name) {
        return function () {
          return _this.setState(_defineProperty({}, name, !_this.state[name]));
        };
      };

      _this.assembleCommands = function () {
        var commands = _extends({}, _this.defaultCommands, _this.props.commands);

        (0, _terminalUtils.pluginMap)(_this.props.plugins, function (plugin) {
          if (plugin.commands) {
            commands = _extends({}, commands, plugin.commands);
          }
        });

        _this.setState({ commands: (0, _terminalUtils.modCommands)(commands) });
      };

      _this.autocompleteValue = function (inputRef) {
        var descriptions = _this.state.descriptions;

        var keysToCheck = Object.keys(descriptions).filter(function (key) {
          return descriptions[key] !== false;
        });
        var ratings = [];
        if (inputRef.value.length > 1) {
          ratings = _stringSimilarity2.default.findBestMatch( // eslint-disable-line
          inputRef.value, keysToCheck).ratings;
        } else {
          ratings = keysToCheck.reduce(function (full, item) {
            if (item.indexOf(inputRef.value) === 0) {
              full.push({ target: item, rating: 1 });
            }
            return full;
          }, []);
        }
        return ratings.filter(function (item) {
          return item.rating > 0;
        });
      };

      _this.clearScreen = function (args, printLine, runCommand, instance) {
        instance.setState({ summary: [] });
      };

      _this.checkShortcuts = function (instance, key, e) {
        var controller = instance.state.controller;

        var cuts = {};
        if (controller !== null) {
          if (controller.shortcuts) {
            cuts = (0, _terminalUtils.getShortcuts)(cuts, controller.shortcuts);
          }
        } else {
          var instanceData = _this.state.instances.find(function (i) {
            return (0, _lodash2.default)(i.instance, instance);
          });
          cuts = _this.state.shortcuts;
          if (instanceData) {
            Object.values(instanceData.pluginInstances).forEach(function (i) {
              cuts = (0, _terminalUtils.getShortcuts)(cuts, i.shortcuts);
            });
          }
        }

        var shortcuts = Object.keys(cuts);
        if (shortcuts.length > 0) {
          var keyInputs = instance.state.keyInputs;

          var modKey = key;
          if (key === 'meta') {
            // eslint-disable-next-line no-nested-ternary
            modKey = _terminalUtils.os === 'darwin' ? 'cmd' : _terminalUtils.os === 'win' ? 'win' : 'meta';
          }
          keyInputs.push(modKey);
          var len = keyInputs.length;

          var options = shortcuts.map(function (cut, i) {
            return [cut.replace(/\s/g, '').split('+'), i];
          }).filter(function (cut) {
            return cut[0].length >= keyInputs.length;
          }).filter(function (cut) {
            return (0, _lodash2.default)(cut[0].slice(0, len), keyInputs);
          });

          if (options.length > 0) {
            if (options.length === 1 && options[0][0].length === len) {
              var shortcut = shortcuts[options[0][1]];
              var action = cuts[shortcut];
              if (typeof action === 'string') {
                _this.runCommand(instance, cuts[shortcut]);
              } else if (typeof action === 'function') {
                e.preventDefault();
                e.stopPropagation();
                action();
              }
              instance.setState({ keyInputs: [] });
            }
          } else if (keyInputs.length > 0) {
            instance.setState({ keyInputs: [] });
          }
        }
      };

      _this.editLine = function (args, printLine, runCommand, instance) {
        var summary = instance.state.summary;

        var index = args.line;
        if (index < 0) {
          index = summary.length === 0 ? 0 : summary.length - index;
        }
        summary[index] = args._.join(' ');
        instance.setState({ summary: summary });
      };

      _this.handleChange = function (instance, e) {
        var _instance$state3 = instance.state,
            input = _instance$state3.input,
            promptPrefix = _instance$state3.promptPrefix,
            prompt = _instance$state3.prompt,
            history = _instance$state3.history,
            controller = _instance$state3.controller;

        var saveToHistory = controller !== null ? controller.history || false : true;
        if (e.key === 'Enter' && !e.shiftKey) {
          if (typeof e.dontShowCommand === 'undefined') {
            _this.printLine.bind(_this, instance)('' + promptPrefix + prompt + ' ' + e.target.value, false);
          }

          input.push(e.target.value);
          var res = _this.runCommand(instance, '' + input.join('\n'));

          if (typeof res !== 'undefined') {
            _this.printLine.bind(_this, instance)(res);
          }

          var newHistory = [].concat(_toConsumableArray(history), [e.target.value]);
          var historyProps = saveToHistory ? {
            history: newHistory,
            historyCounter: newHistory.length
          } : {};
          instance.setState(_extends({
            input: []
          }, historyProps));
          e.target.value = ''; // eslint-disable-line no-param-reassign
        } else if (e.key === 'Enter' && e.shiftKey) {
          _this.printLine.bind(_this, instance)('' + promptPrefix + prompt + ' ' + e.target.value, false);
          var _newHistory = [].concat(_toConsumableArray(history), [e.target.value]);
          var _historyProps = saveToHistory ? {
            history: _newHistory,
            historyCounter: _newHistory.length
          } : {};
          instance.setState(_extends({
            input: [].concat(_toConsumableArray(input), [e.target.value])
          }, _historyProps));
          e.target.value = ''; // eslint-disable-line no-param-reassign
        }
        if (typeof _this.props.afterChange === 'function') {
          _this.props.afterChange(e);
        }
      };

      _this.handlerKeyPress = function (instance, e, inputRef) {
        var _whatkey = (0, _whatkey3.default)(e),
            key = _whatkey.key;

        var _instance$state4 = instance.state,
            historyCounter = _instance$state4.historyCounter,
            keyInputs = _instance$state4.keyInputs,
            controller = _instance$state4.controller;

        if (keyInputs.length === 0 || keyInputs.length === 0) {
          if (controller !== null) {
            if (controller.onKeyPress) {
              controller.onKeyPress(key);
            }
          } else {
            switch (key) {
              case 'up':
                _this.setValueWithHistory(instance, historyCounter - 1, inputRef);
                if (_this.state.tabbed) {
                  _this.setState({ tabbed: false });
                }
                break;
              case 'down':
                _this.setValueWithHistory(instance, historyCounter + 1, inputRef);
                if (_this.state.tabbed) {
                  _this.setState({ tabbed: false });
                }
                break;
              case 'tab':
                e.preventDefault();
                if (inputRef.value !== '' && _this.state.tabbed === true) {
                  var contents = _this.autocompleteValue(inputRef);
                  _this.printLine(instance, '' + instance.state.promptPrefix + instance.state.prompt + ' ' + inputRef.value, false);
                  _this.printLine(instance, _react2.default.createElement(
                    'span',
                    null,
                    contents.filter(function (item) {
                      return typeof item !== 'undefined';
                    }).map(function (item) {
                      var styles = {
                        marginRight: 5,
                        width: 'calc(33% - 5px)',
                        display: 'inline-block'
                      };
                      if (contents.length > 3) {
                        styles.marginBottom = 5;
                      }
                      return _react2.default.createElement(
                        'span',
                        {
                          style: styles,
                          key: item.target + '-' + item.rating
                        },
                        item.target
                      );
                    })
                  ), false);
                  _this.setState({ tabbed: false });
                } else {
                  _this.setState({ tabbed: true });
                }
                break;
              default:
                if (_this.state.tabbed) {
                  _this.setState({ tabbed: false });
                }
                break;
            }
          }
        }
        _this.checkShortcuts(instance, key, e);
      };

      _this.loadPlugins = function () {
        var pluginData = {};
        (0, _terminalUtils.pluginMap)(_this.props.plugins, function (plugin) {
          try {
            pluginData[plugin.displayName] = plugin.defaultData;
          } catch (e) {
            console.error('Error loading plugin ' + plugin.displayName, e); // eslint-disable-line no-console
          }
        });
        _this.pluginData = pluginData;
      };

      _this.getPluginMethod = function (instance, name, method) {
        var instanceData = _this.state.instances.find(function (i) {
          return (0, _lodash2.default)(i.instance, instance);
        });
        if (instanceData) {
          if (instanceData.pluginMethods[name]) {
            if (instanceData.pluginMethods[name][method]) {
              return instanceData.pluginMethods[name][method];
            }
            throw new Error('No method with name ' + method + ' has been registered for plugin ' + name);
          } else {
            throw new Error('No plugin with name ' + name + ' has been registered');
          }
        }
        return null;
      };

      _this.setCanScroll = function (instance, force) {
        if (typeof force !== 'undefined') {
          instance.setState({ canScroll: force });
        }
      };

      _this.setScrollPosition = function (instance, pos) {
        if (typeof pos === 'number') {
          instance.setScrollPosition(pos);
        }
      };

      _this.focusInput = function (instance) {
        if (typeof pos === 'number') {
          instance.focusInput();
        }
      };

      _this.printLine = function (instance, inp) {
        var std = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var print = true;
        if (std) {
          var instanceData = _this.state.instances.find(function (i) {
            return (0, _lodash2.default)(i.instance, instance);
          });
          if (instanceData) {
            var plugins = instanceData.pluginInstances;
            for (var i = 0; i < plugins.length; i += 1) {
              try {
                print = plugins[i].readStdOut(inp);
              } catch (e) {
                // Do nothing
              }
            }
          }
        }

        if (print !== false) {
          var summary = instance.state.summary;

          summary.push(inp);
          instance.setState({ summary: summary });
        }
      };

      _this.removeLine = function (instance) {
        var lineNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
        var summary = instance.state.summary;

        summary.splice(lineNumber, 1);
        instance.setState({ summary: summary });
      };

      _this.runCommand = function (instance, inputText) {
        var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var inputArray = inputText.split(' ');
        var input = inputArray[0];
        var args = inputArray; // Undefined for function call
        var controller = instance.state.controller;

        var commands = {};
        if (!force && controller !== null) {
          if (controller.runCommand) {
            return controller.runCommand(inputText);
          } else if (controller.commands) {
            commands = _extends({}, (0, _terminalUtils.modCommands)(controller.commands));
          }
        } else {
          var instanceData = _this.state.instances.find(function (i) {
            return (0, _lodash2.default)(i.instance, instance);
          });
          commands = _extends({}, _this.state.commands);
          if (instanceData) {
            Object.values(instanceData.pluginInstances).forEach(function (i) {
              commands = _extends({}, commands, (0, _terminalUtils.modCommands)(i.commands));
            });
          }
        }

        var command = commands[input];
        var res = void 0;

        if (input === '') {
          // do nothing
        } else if (command === undefined) {
          if (typeof _this.props.commandPassThrough === 'function') {
            res = _this.props.commandPassThrough(inputArray, _this.printLine.bind(_this, instance), _this.runCommand.bind(_this, instance));
          } else {
            _this.printLine.bind(_this, instance)('-bash:' + input + ': command not found');
          }
        } else {
          var parsedArgs = command.parse(args);
          var type = typeof parsedArgs === 'undefined' ? 'undefined' : _typeof(parsedArgs);
          if (type !== 'object' || type === 'object' && !parsedArgs.help) {
            res = command.method(parsedArgs, _this.printLine.bind(_this, instance), _this.runCommand.bind(_this, instance), command.needsInstance === true ? instance : undefined);
          }
        }
        if (typeof _this.props.commandWasRun === 'function') {
          _this.props.commandWasRun(inputArray, _this.printLine.bind(_this, instance), _this.runCommand.bind(_this, instance));
        }
        return res;
      };

      _this.runCommandOnActive = function (inputText) {
        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var data = _this.state.instances.find(function (i) {
          return i.index === _this.state.activeTab;
        });
        if (data && data.instance !== null) {
          _this.runCommand(data.instance, inputText, force);
        }
      };

      _this.printToActive = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var data = _this.state.instances.find(function (i) {
          return i.index === _this.state.activeTab;
        });
        if (data && data.instance !== null && data.instance.state.controller === null) {
          _this.printLine.apply(_this, [data.instance].concat(args));
        }
      };

      _this.watchConsoleLogging = function () {
        (0, _utils.handleLogging)('log', _this.printToActive);
        (0, _utils.handleLogging)('info', _this.printToActive);
        (0, _utils.handleLogging)('error', _this.printToActive);
        (0, _utils.handleLogging)('warn', _this.printToActive);
      };

      _this.showHelp = function (args, printLine, runCommand, instance) {
        var commands = _extends({}, _this.state.commands);
        var descriptions = _extends({}, _this.state.descriptions);
        var instanceData = _this.state.instances.find(function (i) {
          return (0, _lodash2.default)(i.instance, instance);
        });
        if (instanceData) {
          Object.values(instanceData.pluginInstances).forEach(function (i) {
            commands = _extends({}, commands, i.commands);
            descriptions = _extends({}, descriptions, i.descriptions);
          });
        }
        var options = Object.keys(commands);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var option = _step.value;

            // eslint-disable-line no-restricted-syntax
            if (descriptions[option] !== false) {
              printLine(option + ' - ' + descriptions[option]);
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
      };

      _this.showMsg = function (args, printLine) {
        if (_this.props.msg && _this.props.msg.length > 0) {
          printLine(_this.props.msg);
        }
      };

      _this.pluginData = {};

      _this.defaultCommands = {
        // eslint-disable-line react/sort-comp
        show: _this.showMsg,
        clear: {
          method: _this.clearScreen,
          needsInstance: true
        },
        help: {
          method: _this.showHelp,
          needsInstance: true
        },
        echo: function echo(input) {
          return input.slice(1).join(' ');
        },
        'edit-line': {
          method: _this.editLine,
          needsInstance: true,
          options: [{
            name: 'line',
            description: 'the line you want to edit. -1 is the last line',
            init: function init(value) {
              return parseInt(value, 10);
            },
            defaultValue: -1
          }]
        }
      };

      _this.defaultDesciptions = {
        show: props.msg && props.msg.length > 0 ? 'show the msg' : false,
        clear: 'clear the screen',
        help: 'list all the commands',
        echo: false,
        'edit-line': false
      };

      _this.defaultShortcuts = {
        'win, linux, darwin': {
          'alt + t': _this.createTab
        },
        'win, linux': {
          'ctrl + l': 'clear'
        },
        darwin: {
          'cmd + k': 'clear'
        }
      };

      _this.state = {
        tabbed: false,
        commands: {},
        descriptions: {},
        show: props.startState !== 'closed',
        minimise: props.startState === 'minimised',
        maximise: props.startState === 'maximised',
        shortcuts: {},
        activeTab: '',
        tabs: [],
        instances: []
      };
      return _this;
    }

    _createClass(Terminal, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          instances: this.state.instances,
          show: this.state.show,
          minimise: this.state.minimise,
          maximise: this.state.maximise,
          activeTab: this.state.activeTab,
          barShowing: !this.props.hideTopBar,
          tabsShowing: this.props.allowTabs,
          openWindow: this.setTrue('show'),
          closeWindow: this.setFalse('show'),
          minimiseWindow: this.setTrue('minimise'),
          unminimiseWindow: this.setFalse('minimise'),
          maximiseWindow: this.setTrue('maximise'),
          unmaximiseWindow: this.setFalse('maximise'),
          toggleShow: this.toggleState('show'),
          toggleMaximise: this.toggleState('maximise'),
          toggleMinimize: this.toggleState('minimise')
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = {
          color: this.props.color,
          prompt: this.props.prompt,
          barColor: this.props.barColor,
          outputColor: this.props.outputColor,
          backgroundColor: this.props.backgroundColor
        };

        return _react2.default.createElement(
          _styledComponents.ThemeProvider,
          { theme: theme },
          _react2.default.createElement(
            _styledElements.Base,
            {
              className: 'terminal-base',
              fullscreen: this.state.maximise
            },
            this.getAppContent()
          )
        );
      }
    }]);

    return Terminal;
  }(_react.Component), _class.displayName = 'Terminal', _class.version = '4.3.0', _class.propTypes = _types.TerminalPropTypes, _class.defaultProps = _types.TerminalDefaultProps, _class.childContextTypes = _types.TerminalContextTypes, _temp);
  exports.default = Terminal;
});
//# sourceMappingURL=index.js.map