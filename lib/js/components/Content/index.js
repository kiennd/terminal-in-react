(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'whatkey', './styled-elements'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('whatkey'), require('./styled-elements'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.whatkey, global.styledElements);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _whatkey2, _styledElements) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _whatkey3 = _interopRequireDefault(_whatkey2);

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

  var _class, _temp2;

  var Content = (_temp2 = _class = function (_Component) {
    _inherits(Content, _Component);

    function Content() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Content);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Content.__proto__ || Object.getPrototypeOf(Content)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        summary: [],
        promptPrefix: '',
        prompt: '>',
        history: [],
        historyCounter: 0,
        input: [],
        keyInputs: [],
        canScroll: true,
        controller: null
      }, _this.componentWillMount = function () {
        var data = _this.context.instances.find(function (i) {
          return i.index === _this.props.id;
        });
        var state = { prompt: _this.props.prompt };
        if (data) {
          state = _extends({}, state, data.oldData);
        }
        _this.setState(state);
      }, _this.componentDidMount = function () {
        _this.focusInput();
        var data = _this.context.instances.find(function (i) {
          return i.index === _this.props.id;
        });
        _this.unregister = _this.props.register(_this);
        if (!data || Object.keys(data.oldData).length === 0) {
          _this.handleChange({ target: { value: 'show' }, key: 'Enter', dontShowCommand: true });
        }
      }, _this.componentDidUpdate = function () {
        if (_this.inputWrapper !== null) {
          _this.inputWrapper.scrollIntoView(false);
        }
      }, _this.setScrollPosition = function (pos) {
        setTimeout(function () {
          if (_this.contentWrapper !== null) {
            _this.contentWrapper.scrollTop = pos;
          }
        }, 50);
      }, _this.focusInput = function () {
        if (_this.com !== null) {
          _this.com.focus();
        }
      }, _this.handleChange = function (e) {
        _this.props.handleChange(_this, e);
      }, _this.handleKeyPress = function (e) {
        _this.props.handlerKeyPress(_this, e, _this.com);
      }, _this.handleOuterKeypress = function (e) {
        var _whatkey = (0, _whatkey3.default)(e),
            key = _whatkey.key;

        var actionKeys = ['up', 'down', 'left', 'right', 'enter'];
        if (_whatkey2.unprintableKeys.indexOf(key) < 0) {
          if (document.activeElement !== _this.com) {
            _this.com.focus();
            _this.com.value += (0, _whatkey3.default)(e).char;
          }
        } else if (actionKeys.indexOf(key) > -1) {
          _this.com.focus();
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Content, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unregister(this.state);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var id = this.props.id;
        var _context = this.context,
            maximise = _context.maximise,
            activeTab = _context.activeTab,
            barShowing = _context.barShowing,
            tabsShowing = _context.tabsShowing;


        if (id !== activeTab) {
          return null;
        }

        var output = this.state.summary.map(function (content, i) {
          if (typeof content === 'string' && content.length === 0) {
            return _react2.default.createElement(
              _styledElements.OutputLine,
              { key: i },
              '\xA0'
            );
          }
          return _react2.default.createElement(
            _styledElements.PreOutputLine,
            { key: i },
            Array.isArray(content) ? content.map(function (cont, key) {
              return _react2.default.createElement(
                'span',
                { style: { marginRight: 5 }, key: 'inner-' + key },
                cont
              );
            }) : content
          );
        });

        var toSubtract = 30;
        if (!barShowing) {
          toSubtract -= 30;
        }
        if (tabsShowing) {
          toSubtract += 30;
        }

        return _react2.default.createElement(
          _styledElements.ContainerMain,
          {
            style: _extends({}, maximise ? { maxWidth: '100%', maxHeight: 'calc(100% - ' + toSubtract + 'px)' } : {}, this.state.canScroll ? { overflowY: 'auto' } : { overflowY: 'hidden' }),
            tabIndex: '0',
            onKeyUp: this.handleOuterKeypress,
            innerRef: function innerRef(ctw) {
              _this2.contentWrapper = ctw;
            }
          },
          _react2.default.createElement(
            _styledElements.Holder,
            null,
            _react2.default.createElement(
              _styledElements.ContainerContent,
              null,
              _react2.default.createElement(
                _styledElements.InputArea,
                null,
                output,
                _react2.default.createElement(
                  _styledElements.Input,
                  {
                    innerRef: function innerRef(elm) {
                      _this2.inputWrapper = elm;
                    }
                  },
                  _react2.default.createElement(
                    _styledElements.Prompt,
                    null,
                    this.state.promptPrefix + this.state.prompt
                  ),
                  _react2.default.createElement(_styledElements.MainInput, {
                    type: 'text',
                    tabIndex: '-1',
                    innerRef: function innerRef(com) {
                      _this2.com = com;
                    },
                    onKeyPress: this.handleChange,
                    onKeyDown: this.handleKeyPress
                  })
                )
              )
            )
          )
        );
      }
    }]);

    return Content;
  }(_react.Component), _class.displayName = 'Content', _class.propTypes = {
    id: _propTypes2.default.string,
    oldData: _propTypes2.default.object, // eslint-disable-line
    prompt: _propTypes2.default.string,
    register: _propTypes2.default.func,
    handleChange: _propTypes2.default.func,
    handlerKeyPress: _propTypes2.default.func.isRequired
  }, _class.defaultProps = {
    prompt: '>',
    oldData: {}
  }, _class.contextTypes = {
    maximise: _propTypes2.default.bool,
    instances: _propTypes2.default.array,
    activeTab: _propTypes2.default.string,
    barShowing: _propTypes2.default.bool,
    tabsShowing: _propTypes2.default.bool
  }, _temp2);
  exports.default = Content;
});
//# sourceMappingURL=index.js.map