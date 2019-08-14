'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Orientation = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Orientation = exports.Orientation = function (_Component) {
  _inherits(Orientation, _Component);

  function Orientation() {
    _classCallCheck(this, Orientation);

    return _possibleConstructorReturn(this, (Orientation.__proto__ || Object.getPrototypeOf(Orientation)).apply(this, arguments));
  }

  _createClass(Orientation, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          orientation = _props.orientation,
          children = _props.children,
          className = _props.className;

      return _react2.default.createElement(
        'div',
        { className: className + ' react-orientation react-orientation--' + orientation },
        children
      );
    }
  }]);

  return Orientation;
}(_react.Component);

Orientation.propTypes = {
  alwaysRender: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  orientation: _propTypes2.default.oneOf(['portrait', 'landscape']).isRequired
};

Orientation.defaultProps = {
  className: '',
  alwaysRender: true
};

var noop = function noop() {
  return false;
};

window.screen.lockOrientationUniversal = window.screen.lockOrientation || window.screen.mozLockOrientation || window.screen.msLockOrientation;

var lock = function lock(orientation) {
  var _window = window,
      screen = _window.screen;

  if (screen.orientation && typeof screen.orientation.lock === 'function') {
    return window.screen.orientation.lock(orientation);
  } else if (screen.lockOrientationUniversal) {
    return new Promise(function (resolve, reject) {
      if (screen.lockOrientationUniversal(orientation)) {
        resolve();
      } else {
        reject();
      }
    });
  } else {
    return new Promise(function (resolve, reject) {
      return reject();
    });
  }
};

var DeviceOrientation = function (_Component2) {
  _inherits(DeviceOrientation, _Component2);

  function DeviceOrientation(props) {
    _classCallCheck(this, DeviceOrientation);

    var _this2 = _possibleConstructorReturn(this, (DeviceOrientation.__proto__ || Object.getPrototypeOf(DeviceOrientation)).call(this, props));

    _this2.lockOrientation(props);
    _this2.onOrientationChange = _this2.onOrientationChange.bind(_this2);

    _this2.state = {
      orientation: null,
      type: null,
      angle: null
    };
    return _this2;
  }

  _createClass(DeviceOrientation, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.onOrientationChange(null);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('DeviceOrientation', 'componentDidMount');
      if (window.screen.orientation && 'onchange' in window.screen.orientation) {
        console.log('Using screen.orientation.onchange');
        window.screen.orientation.addEventListener('change', this.onOrientationChange);
      } else if ('onorientationchange' in window) {
        console.log('Using window.onorientationchange');
        window.addEventListener('orientationchange', this.onOrientationChange);
      } else {
        console.warn('No orientationchange events');
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('DeviceOrientation', 'componentWillUnmount');
      if (window.screen.orientation && 'onchange' in window.screen.orientation) {
        console.log('Removing screen.orientation.onchange');
        window.screen.orientation.removeEventListener('change', this.onOrientationChange);
      } else if ('onorientationchange' in window) {
        console.log('Removing window.onorientationchange');
        window.removeEventListener('orientationchange', this.onOrientationChange);
      }
    }
  }, {
    key: 'onOrientationChange',
    value: function onOrientationChange(event) {
      var onOrientationChange = this.props.onOrientationChange || noop;
      var orientation = 'portrait';
      var type = 'primary';
      var angle = 0;
      if (window.orientation) {
        angle = window.orientation;
        orientation = Math.abs(angle) === 90 ? 'landscape' : 'portrait';
      }

      if (window.screen.orientation) {
        var _window$screen$orient = window.screen.orientation.type.split('-');

        var _window$screen$orient2 = _slicedToArray(_window$screen$orient, 2);

        orientation = _window$screen$orient2[0];
        type = _window$screen$orient2[1];

        angle = window.screen.orientation;
      }
      this.setState({
        orientation: orientation,
        type: type,
        angle: angle
      });
      onOrientationChange(orientation, type, angle);
    }
  }, {
    key: 'lockOrientation',
    value: function lockOrientation(_ref) {
      var _lockOrientation = _ref.lockOrientation;

      if (typeof _lockOrientation !== 'string') {
        return;
      }
      var onLockOrientation = this.props.onLockOrientation || noop;
      return lock(_lockOrientation).then(function () {
        onLockOrientation(true);
      }).catch(function () {
        onLockOrientation(false);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className;
      var orientation = this.state.orientation;

      return _react2.default.createElement(
        'div',
        { className: '' + className },
        _react.Children.map(children, function (child) {
          var props = child.props;

          if (props.alwaysRender || props.orientation === orientation) {
            return child;
            // } else {
            //   console.log('Skipping child', child)
          }
        })
      );
    }
  }]);

  return DeviceOrientation;
}(_react.Component);

// https://developer.mozilla.org/en-US/docs/Web/API/screen/lockOrientation


exports.default = DeviceOrientation;
var LOCK_ORIENTATIONS = ['portrait-primary', 'portrait-secondary', 'landscape-primary', 'landscape-secondary', 'portrait', 'landscape', 'default'];

var isOrientation = function isOrientation(props, propName, componentName, location, propFullName) {
  var propValue = props[propName];
  if (propValue.type !== Orientation) {
    return new Error('Invalid ' + location + ' \'' + propFullName + '\' supplied to \'' + componentName + '\', expected \'Orientation\' component.');
  }
};

DeviceOrientation.propTypes = {
  children: _propTypes2.default.oneOfType([isOrientation, _propTypes2.default.arrayOf(isOrientation)]).isRequired,
  className: _propTypes2.default.string,
  lockOrientation: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(LOCK_ORIENTATIONS), _propTypes2.default.arrayOf(_propTypes2.default.oneOf(LOCK_ORIENTATIONS))]),
  onLockOrientation: _propTypes2.default.func,
  onOrientationChange: _propTypes2.default.func
};

DeviceOrientation.defaultProps = {
  className: ''
};