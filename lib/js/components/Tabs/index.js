(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './styled-elements'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./styled-elements'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.styledElements);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _styledElements) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  function last(arr) {
    var pre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var base = arr.length > 2 ? '' + arr[arr.length - 2] : '';
    if (base.indexOf(pre + '> ') !== 0) {
      base = 'bash';
    }
    return base.replace(pre + '> ', '').split(' ')[0];
  }

  var Tabs = (_temp2 = _class = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Tabs);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        showingPlus: false
      }, _this.handleBarClick = function (e) {
        e.stopPropagation();
        _this.props.createTab();
      }, _this.handleTabClick = function (e, index) {
        e.preventDefault();
        e.stopPropagation();
        _this.props.setActiveTab(index);
      }, _this.handleRemoveClick = function (e, index, instance) {
        e.preventDefault();
        e.stopPropagation();
        _this.props.removeTab(index, instance.props.id);
        return false;
      }, _this.removePlus = function () {
        if (_this.state.showingPlus) {
          _this.setState({ showingPlus: false });
        }
      }, _this.showPlus = function () {
        if (!_this.state.showingPlus) {
          _this.setState({ showingPlus: true });
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tabs, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var showingPlus = this.state.showingPlus;
        var _props = this.props,
            style = _props.style,
            active = _props.active;

        var tabs = this.context.instances.map(function (_ref2) {
          var index = _ref2.index,
              instance = _ref2.instance;

          var title = instance && instance.state ? last(instance.state.summary, instance.state.promptPrefix) : 'bash';
          return _react2.default.createElement(
            _styledElements.Tab,
            {
              key: index,
              active: active === index,
              onClick: function onClick(e) {
                return _this2.handleTabClick(e, index);
              },
              onFocus: function onFocus(e) {
                return _this2.handleTabClick(e, index);
              },
              title: title,
              tabIndex: 0
            },
            _this2.context.instances.length > 1 && _react2.default.createElement(
              _styledElements.TabClose,
              {
                title: 'Close Tab',
                onMouseDown: function onMouseDown(e) {
                  return _this2.handleRemoveClick(e, index, instance);
                }
              },
              'x'
            ),
            title
          );
        });

        return _react2.default.createElement(
          _styledElements.TabBar,
          {
            style: _extends({}, style, this.context.maximise ? { maxWidth: '100%' } : {})
          },
          tabs,
          _react2.default.createElement(
            _styledElements.TabBarEmpty,
            {
              onMouseEnter: this.showPlus,
              onMouseLeave: this.removePlus
            },
            _react2.default.createElement(
              _styledElements.TabPlus,
              {
                visible: showingPlus,
                onClick: this.handleBarClick
              },
              '+'
            )
          )
        );
      }
    }]);

    return Tabs;
  }(_react.Component), _class.displayName = 'Tabs', _class.propTypes = {
    style: _propTypes2.default.object, // eslint-disable-line
    active: _propTypes2.default.string,
    setActiveTab: _propTypes2.default.func,
    removeTab: _propTypes2.default.func,
    createTab: _propTypes2.default.func
  }, _class.defaultProps = {
    style: {}
  }, _class.contextTypes = {
    instances: _propTypes2.default.array,
    maximise: _propTypes2.default.bool
  }, _temp2);
  exports.default = Tabs;
});
//# sourceMappingURL=index.js.map