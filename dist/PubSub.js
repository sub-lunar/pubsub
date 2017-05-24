"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class that provides PubSub (event-like) functionality.
 *
 * Author: Emanuel Tannert <post@etannert.de>
 * (https://github.com/sub-lunar/)
 *
 * Based on
 * https://davidwalsh.name/pubsub-javascript
 * under terms of the MIT License (see LICENSE).
 *
 * Inherit from it to add PubSub methods to your own
 * classes (recommended). Example:
 *
 * [Thing.js]
 *
 * import PubSub from '@sub-lunar/pubsub'
 *
 * export default class Thing extends PubSub {
 *
 *   constructor () {
 *
 *     super()
 *
 *     ...
 *   }
 *
 *   doStuff () {
 *
 *     this.publish('event')
 *   }
 * }
 *
 * [main.js]
 *
 * import Thing from './Thing'
 *
 * const thing = new Thing()
 *
 * thing.on('event', () => {
 *   console.log('it happened')
 * })
 *
 * thing.doStuff()
 * // => "it happened"
 *
 *
 * Of course, you can also just instantiate PubSub
 * directly and use it as a global hub (not so much
 * recommended).
 *
 **/

module.exports = function () {
  function PubSub() {
    _classCallCheck(this, PubSub);

    this.topics = {};
  }

  _createClass(PubSub, [{
    key: "on",
    value: function on(topic, listener) {

      if (!this.topics.hasOwnProperty(topic)) {
        this.topics[topic] = [];
      }

      this.topics[topic].push(listener);
    }
  }, {
    key: "remove",
    value: function remove(topic, listener) {

      if (!this.topics.hasOwnProperty(topic)) {
        throw new Error("Topic " + topic + " does not exist.");
      }

      for (var i = 0; i < this.topics[topic].length; i++) {
        if (this.topics[topic][i] === listener) {
          this.topics[topic].splice(i, 1);
          return true;
        }
      }

      return false;
    }
  }, {
    key: "publish",
    value: function publish(topic, info) {

      if (!this.topics.hasOwnProperty(topic)) {
        return;
      }

      this.topics[topic].forEach(function (listener) {
        return listener(info);
      });
    }
  }]);

  return PubSub;
}();