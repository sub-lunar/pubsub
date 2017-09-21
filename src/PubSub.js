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

module.exports = class PubSub {

  constructor () {

    this.topics = Object.create(null)

    this.on = this.on.bind(this)
    this.off = this.off.bind(this)
    this.publish = this.publish.bind(this)
  }

  on (topic, listener) {

    if (!(topic in this.topics)) {
      this.topics[topic] = []
    }

    this.topics[topic].push(listener)
  }

  off (topic, listener) {

    if (!(topic in this.topics)) {
      throw new Error(`Topic ${ topic } does not exist.`)
    }

    for (let i = 0; i < this.topics[topic].length; i++) {
      if (this.topics[topic][i] === listener) {
        this.topics[topic].splice(i, 1)
        return true
      }
    }

    return false
  }

  publish (topic, info) {

    // this doesn't throw, but fails silently when
    // trying to publish to a nonexistent topic.
    // while failing silently is generally not the
    // best idea, we cannot know at this point
    // if the topic is going to be added later, i.e.
    // it just doesn't have any listeners yet, but
    // they will be registered later.
    if (!(topic in this.topics)) {
      return
    }

    this.topics[topic].forEach(
      listener => listener(info)
    )
  }
}
