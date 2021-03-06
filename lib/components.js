'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.LayerContext = exports.Layer = exports.LayerStackMountPoint = undefined;var _react = require('react');var _react2 = _interopRequireDefault(_react);
var _reactRedux = require('react-redux');
var _redux = require('redux');

var _reducer = require('./reducer');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}

var LayerStackMountPoint = exports.LayerStackMountPoint = function LayerStackMountPoint() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'layer_stack';return (0, _reactRedux.connect)(
  function (store) {return store[namespace];},
  function (dispatch) {return (0, _redux.bindActionCreators)(_reducer.ACTIONS, dispatch);})(
  function (_ref)


  {var mountPointId = _ref.id;var mountPointArgs = _ref.args;var renderFn = _ref.renderFn;var views = _ref.views;var displaying = _ref.displaying;var show = _ref.show;var hide = _ref.hide;var hideAll = _ref.hideAll;
    return (
      _react2.default.createElement('div', null, ' ', renderFn ? renderFn({ views: views, displaying: displaying, show: show, hide: hide, hideAll: hideAll, mountPointId: mountPointId, mountPointArgs: mountPointArgs }) // it's possible to provide alternative renderFn for the MountPoint
        : displaying.length ? displaying.map(function (id, index) {return (// if no alternative renderFn provided we'll use the default one
            _react2.default.createElement('div', { key: id },
              function () {
                var view = views[id];
                if (view && view.renderFn && view.mountPointId === mountPointId) {
                  return view.renderFn.apply(view, [{
                    index: index, id: id, show: show, hide: hide, hideAll: hideAll, displaying: displaying, views: views, mountPointArgs: mountPointArgs, // seems like there is no valid use-case mountPointId in the Layer render function
                    showOnlyMe: function showOnlyMe() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return hideAll() || show.apply(undefined, [id].concat(args));}, // TODO: think about improvement
                    hideMe: function hideMe() {return hide(id);}, // intention here is to hide ID's management from Layer and let app developer manage these IDs independently
                    // which will give an ability to write general-purpose Layers and share them b/w projects
                    showMe: function showMe() {for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {args[_key2] = arguments[_key2];}return show.apply(undefined, [id].concat(args));} // sometimes you may want to change args of the current layer
                  }].concat(_toConsumableArray(view.args)));
                }
                if (typeof view === 'undefined' || typeof view.renderFn === 'undefined') {
                  throw new Error('\nIt seems like you\'re using LayerContext with id="' +
                  id + '" but corresponding Layer isn\'t declared in the current Components tree.\nMake sure that Layer with id="' +
                  id + '" is rendered into the current tree.\n');

                }}()));}) :
        _react2.default.createElement('noscript', null)));


  });};

var Layer = exports.Layer = function Layer() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'layer_stack';return (0, _reactRedux.connect)(
  function (store) {return store[namespace];},
  function (dispatch) {return (0, _redux.bindActionCreators)(_reducer.ACTIONS, dispatch);})(
  _react2.default.createClass({
    componentWillMount: function componentWillMount() {
      this.props.register(this.props.id, this.props.children, this.props.mountPointId);
      if (this.props.showInitially) {var _props;
        (_props = this.props).show.apply(_props, [this.props.id].concat(_toConsumableArray(this.props.initialArgs || [])));
      } else {var _props2;
        (_props2 = this.props).setArgs.apply(_props2, [this.props.id].concat(_toConsumableArray(this.props.initialArgs || [])));
      }
    },
    shouldComponentUpdate: function shouldComponentUpdate(newProps) {var _props3 =
      this.props;var use = _props3.use;var children = _props3.children;var register = _props3.register;var id = _props3.id;var mountPointId = _props3.mountPointId;
      var needUpdate = false;
      if (id !== newProps.id || mountPointId !== newProps.mountPointId) {
        needUpdate = true;
      } else
      if (children.toString() !== newProps.children.toString()) {
        needUpdate = true;
      } else
      if (use) {
        if (use.length !== newProps.use.length) {
          needUpdate = true;
        } else {
          var i = use.length;
          while (i--) {
            if (JSON.stringify(use[i]) !== JSON.stringify(newProps.use[i])) {
              needUpdate = true;
            }
          }
        }
      }

      if (needUpdate) {
        register(newProps.id, newProps.children, newProps.mountPointId);
        return true;
      }
      return false;
    },

    componentWillUnmount: function componentWillUnmount() {
      // TODO: garbage collection
      // this.props.unregister(this.props.id)
    },

    render: function render() {
      return _react2.default.createElement('noscript', null);
    } }));};


var LayerContext = exports.LayerContext = function LayerContext() {var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'layer_stack';return (0, _reactRedux.connect)(
  function (store) {return store[namespace];},
  function (dispatch) {return (0, _redux.bindActionCreators)(_reducer.ACTIONS, dispatch);})(
  function (_ref2)


  {var children = _ref2.children;var id = _ref2.id;var displaying = _ref2.displaying;var show = _ref2.show;var hide = _ref2.hide;var hideAll = _ref2.hideAll;var views = _ref2.views;
    return children.apply(undefined, [{
      show: show, hide: hide, hideAll: hideAll, displaying: displaying, views: views,
      isActive: displaying.indexOf(id) !== -1,
      showMe: function showMe() {for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}return show.apply(undefined, [id].concat(args));},
      showOnlyMe: function showOnlyMe() {for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}return hideAll() || show.apply(undefined, [id].concat(args));},
      hideMe: function hideMe() {return hide(id);} }].concat(_toConsumableArray(
    views[id].args)));
  });};
//# sourceMappingURL=components.js.map