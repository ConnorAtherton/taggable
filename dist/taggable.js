'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (root) {
  function noop() {}

  var defaults = {
    destructive: true,
    duplicate: false,
    transform: noop
  };

  var delimiters = {
    ENTER: 13,
    SPACE: 13,
    COMMA: 13
  };

  var classes = {
    taglist: 'taggable-tags',
    tag: 'taggable-tag',
    input: 'taggable-input'
  };

  var Taggable = (function () {
    function Taggable(element) {
      var opts = arguments.length <= 1 || arguments[1] === undefined ? defaults : arguments[1];

      _classCallCheck(this, Taggable);

      this._validators = [];
      this._element = helpers.is.domNode(element) ? element : document.querySelector(element);
      this._parentElement = this._element.parentElement;
      this._validator = opts.validator;
      this._destructive = opts.destructive;

      this.tags = [];
      this.delimiter = this.setDelimiter(opts.delimiter);

      // bind events
    }

    _createClass(Taggable, [{
      key: 'keydown',
      value: function keydown(evt) {

        // let it bubble baby...
      }
    }, {
      key: 'addTag',
      value: function addTag(val) {
        this.tags.push(this.transform(val));
      }
    }, {
      key: 'deleteTag',
      value: function deleteTag(val) {
        var index = this.tags.indexOf(val);
        index !== -1 && this.tags.slice(index, 1);
      }
    }, {
      key: 'removeAllTags',
      value: function removeAllTags() {
        // remove internal tags
        this.tags = [];

        // remove child spans

        // remove input value
        this._element.setAttribute('value', this.tags);
      }
    }, {
      key: 'setTags',
      value: function setTags() {
        this._element.setAttribute('value', this.tags.join(this.delimiter));
      }
    }, {
      key: 'setDelimiter',
      value: function setDelimiter(delimiter) {
        if (delimiter && delimiters[delimiter]) {
          return delimiter;
        }

        // default is enter key
        return helpers.is.number(delimiter) ? delimiter : delimiters[ENTER];
      }
    }]);

    return Taggable;
  })()

  //
  // Helpers
  //
  ;

  var helpers = {
    klass: {
      add: function add(node, klass) {
        node.classList += klass;
      },
      remove: function remove(node, klass) {},
      has: function has(node, klass) {
        node.classList.indexOf(klass);
      }
    },

    is: {
      number: function number(val) {
        return val && typeof val === 'number';
      },
      domNode: function domNode(val) {
        return val && val.nodeType;
      }
    }
  };

  root.Taggable = Taggable;
})(window);
/**
 * taggable.js
 *
 * Copyright 2014, Connor Atherton - https://connoratherton.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/ConnorAtherton/taggable
 */