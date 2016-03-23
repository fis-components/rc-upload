'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uid = require('./uid');

var _uid2 = _interopRequireDefault(_uid);

var AjaxUploader = _react2['default'].createClass({
  displayName: 'AjaxUploader',

  propTypes: {
    multiple: _react.PropTypes.bool,
    onStart: _react.PropTypes.func,
    data: _react.PropTypes.object,
    beforeUpload: _react.PropTypes.func
  },

  onChange: function onChange(e) {
    var files = e.target.files;
    this.uploadFiles(files);
  },

  onClick: function onClick() {
    var el = _react2['default'].findDOMNode(this.refs.file);
    if (!el) {
      return;
    }
    el.click();
    el.value = '';
  },

  onKeyDown: function onKeyDown(e) {
    if (e.key === 'Enter') {
      this.onClick();
    }
  },

  onFileDrop: function onFileDrop(e) {
    if (e.type === 'dragover') {
      return e.preventDefault();
    }

    var files = e.dataTransfer.files;
    this.uploadFiles(files);

    e.preventDefault();
  },

  render: function render() {
    var hidden = { display: 'none' };
    var props = this.props;
    return _react2['default'].createElement(
      'span',
      { onClick: this.onClick, onKeyDown: this.onKeyDown, onDrop: this.onFileDrop, onDragOver: this.onFileDrop,
        role: 'button', tabIndex: '0' },
      _react2['default'].createElement('input', { type: 'file',
        ref: 'file',
        style: hidden,
        accept: props.accept,
        multiple: this.props.multiple,
        onChange: this.onChange }),
      props.children
    );
  },

  uploadFiles: function uploadFiles(files) {
    var len = files.length;
    if (len > 0) {
      for (var i = 0; i < len; i++) {
        var file = files.item(i);
        file.uid = (0, _uid2['default'])();
        this.upload(file);
      }
      if (this.props.multiple) {
        this.props.onStart(Array.prototype.slice.call(files));
      } else {
        this.props.onStart(Array.prototype.slice.call(files)[0]);
      }
    }
  },

  upload: function upload(file) {
    var _this = this;

    var props = this.props;
    if (!props.beforeUpload) {
      return this.post(file);
    }

    var before = props.beforeUpload(file);
    if (before && before.then) {
      before.then(function () {
        _this.post(file);
      });
    } else if (before !== false) {
      this.post(file);
    }
  },

  post: function post(file) {
    var props = this.props;
    var req = _superagent2['default'].post(props.action).attach(props.name, file, file.name);
    var data = props.data;
    if (typeof data === 'function') {
      data = data();
    }

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        req.field(key, data[key]);
      }
    }

    function progress(e) {
      props.onProgress(e, file);
    }

    req.on('progress', progress);

    req.end(function (err, ret) {
      req.off('progress', progress);
      if (err || ret.status !== 200) {
        props.onError(err, ret, file);
        return;
      }

      props.onSuccess(ret.body || ret.text, file);
    });
  }
});

exports['default'] = AjaxUploader;
module.exports = exports['default'];