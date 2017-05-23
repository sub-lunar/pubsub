# pubsub

JavaScript (ES2015) PubSub base class to inherit from

[![Build Status](https://travis-ci.org/sub-lunar/pubsub.svg?branch=master)](https://travis-ci.org/sub-lunar/pubsub)

## Install

```
npm install --save @sub-lunar/pubsub
```

## Use

```js

/*
 * Make an own class and let it inherit from PubSub, recommended
 */

// Thing.js

import PubSub from '@sub-lunar/pubsub'

export default class Thing extends PubSub {

  constructor () {
  
    super()
    
    /* ... */
  }
  
  doStuff () {
  
    this.publish('event')
  }
}

// main.js

import Thing from './Thing'

const thing = new Thing()

thing.on('event', () => {
  console.log('it happened')
})

thing.doStuff() // => "it happened"

/*
 * Use PubSub directly, tends to lead to code that's harder to understand,
 * not recommended
 */

// myPubsubHub.js
 
import PubSub from '@sub-lunar/pubsub'

export default const pubsub = PubSub()

// module1.js

import pubsub from './myPubsubHub'

pubsub.publish('greetings', 'greetings from module1')

// totally unrelated module2.js

import pubsub from './myPubsubHub'

pubsub.on('greetings', msg => {
  console.log('Uh, where did _that_ come from?', msg)
})

```

## API

### PubSub#on(topic, fn)

Subscribe `fn` to topic

### PubSub#remove(topic, fn)

Unsubscribe `fn` from topic

### PubSub#publish(topic[, data])

Publish to topic, call all listeners.
Data will be first argument of listeners.

## Credit and License

The code in this repository is inspired by, although quite different from, https://davidwalsh.name/pubsub-javascript which is subject to a MIT license. This module, too, is licensed under a MIT license. For full text, see the LICENSE file.

