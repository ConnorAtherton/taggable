/**
 * taggable.js
 *
 * Copyright 2014, Connor Atherton - https://connoratherton.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/ConnorAtherton/taggable
 */

(function(root) {
  function noop() {}

  const defaults = {
    destructive: true,
    duplicate: false,
    transform: noop
  }

  const delimiters = {
    ENTER: 13,
    SPACE: 13,
    COMMA: 13
  }

  const classes = {
    taglist: 'taggable-tags',
    tag: 'taggable-tag',
    input: 'taggable-input'
  }

  class Taggable {
    constructor(element, opts = defaults) {
      this._validators = [];
      this._element = helpers.is.domNode(element) ? element : document.querySelector(element);
      this._parentElement = this._element.parentElement;
      this._validator = opts.validator;
      this._destructive = opts.destructive;

      this.tags = []
      this.delimiter = this.setDelimiter(opts.delimiter)

      // bind events
    }

    keydown(evt) {

      // let it bubble baby...
    }

    addTag(val) {
      this.tags.push(this.transform(val))
    }

    deleteTag(val) {
      let index = this.tags.indexOf(val)
      index !== -1 && this.tags.slice(index, 1)
    }

    removeAllTags() {
      // remove internal tags
      this.tags = []

      // remove child spans

      // remove input value
      this._element.setAttribute('value', this.tags)
    }

    setTags() {
      this._element.setAttribute('value', this.tags.join(this.delimiter))
    }

    setDelimiter(delimiter) {
      if (delimiter && delimiters[delimiter]) {
        return delimiter
      }

      // default is enter key
      return helpers.is.number(delimiter) ? delimiter : delimiters[ENTER]
    }
  }

  //
  // Helpers
  //
  let helpers = {
    klass: {
      add: (node, klass) => {
        node.classList += klass
      },
      remove: (node, klass) => {

      },
      has: (node, klass) => {
        node.classList.indexOf(klass)
      }
    },

    is: {
      number: (val) => {
        return val && typeof val === 'number';
      },
      domNode: (val) => {
        return val && val.nodeType;
      }
    }
  }

  root.Taggable = Taggable;
})(window)
