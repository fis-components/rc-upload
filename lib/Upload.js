'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AjaxUploader = require('./AjaxUploader');

var _AjaxUploader2 = _interopRequireDefault(_AjaxUploader);

var _IframeUploader = require('./IframeUploader');

var _IframeUploader2 = _interopRequireDefault(_IframeUploader);

function empty() {}

var Upload = _react2['default'].createClass({
  displayName: 'Upload',

  propTypes: {
    forceAjax: _react.PropTypes.bool,
    action: _react.PropTypes.string,
    name: _react.PropTypes.string,
    multipart: _react.PropTypes.bool,
    onError: _react.PropTypes.func,
    onSuccess: _react.PropTypes.func,
    onProgress: _react.PropTypes.func,
    onStart: _react.PropTypes.func,
    data: _react.PropTypes.object,
    accept: _react.PropTypes.string,
    multiple: _react.PropTypes.bool,
    beforeUpload: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      data: {},
      name: 'file',
      forceAjax: false,
      multipart: false,
      onProgress: empty,
      onStart: empty,
      onError: empty,
      onSuccess: empty,
      multiple: false,
      beforeUpload: null
    };
  },

  render: function render() {
    var props = this.props;
    // node 渲染根据 ua 强制设置 forceAjax 或者支持FormData的情况使用AjaxUpload
    if (props.forceAjax || typeof FormData !== 'undefined') {
      return _react2['default'].createElement(_AjaxUploader2['default'], props);
    }

    return _react2['default'].createElement(_IframeUploader2['default'], props);
  }
});

exports['default'] = Upload;
module.exports = exports['default'];