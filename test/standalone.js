import test from 'ava'

import PubSub from '../src/PubSub'

test('standalone callback without data', t => {

  t.plan(4)

  const pubsub = new PubSub()

  let callback1Calls = 0
  function callback1 () {
    callback1Calls++
  }

  pubsub.on('test', callback1)

  t.is(callback1Calls, 0,
       'callback should not run when being registered')

  pubsub.publish('test')

  t.is(callback1Calls, 1,
       'callback should be run when something is published to its topic')

  pubsub.remove('test', callback1)

  t.is(callback1Calls, 1,
       'callback should not be run when being unregistered')

  pubsub.publish('test')

  t.is(callback1Calls, 1,
      'callback should not be run when published to, but no longer registered')
})

test('standalone callback with data', t => {

  t.plan(7)

  const pubsub = new PubSub()

  let calls = 0
  let pass = null
  function listener (data) {
    calls++
    pass = data
  }

  pubsub.on('test', listener)

  t.is(calls, 0, 'no call on register')

  pubsub.publish('test', 'MAOAM')

  t.is(calls, 1, 'one call on publish')
  t.is(pass, 'MAOAM', 'string is passed through to listener')

  const obj = { a: 57, b: [4, 'hey'] }
  pubsub.publish('test', obj)

  t.is(calls, 2, 'one call on publish')
  t.is(pass, obj, 'object is passed through')

  pubsub.remove('test', listener)

  t.is(calls, 2, 'no call on unregister')

  pubsub.publish('test', 73)

  t.is(calls, 2, 'no call on publish after unregister')
})

test('standalone multi callbacks', t => {

  t.plan(16)

  const pubsub = new PubSub()

  let cb1calls = 0
  let cb1pass = null
  let cb2calls = 0
  let cb2pass = null
  let cb3calls = 0
  let cb3pass = null
  function cb1 (data) {
    cb1calls++
    cb1pass = data
  }
  function cb2 (data) {
    cb2calls++
    cb2pass = data
  }
  function cb3 (data) {
    cb3calls++
    cb3pass = data
  }

  pubsub.on('toast', cb1)
  pubsub.on('toast', cb2)
  pubsub.on('toast', cb3)

  t.is(cb1calls, 0)
  t.is(cb2calls, 0)
  t.is(cb3calls, 0)

  pubsub.publish('toast', 'Orange Jam')

  t.is(cb1calls, 1)
  t.is(cb2calls, 1)
  t.is(cb3calls, 1)
  t.is(cb1pass, 'Orange Jam')
  t.is(cb2pass, 'Orange Jam')
  t.is(cb3pass, 'Orange Jam')

  pubsub.remove('toast', cb2)

  t.is(cb2calls, 1)

  pubsub.publish('toast', 'Peabnub Bubber')

  t.is(cb1calls, 2)
  t.is(cb2calls, 1)
  t.is(cb3calls, 2)
  t.is(cb1pass, 'Peabnub Bubber')
  t.is(cb2pass, 'Orange Jam')
  t.is(cb3pass, 'Peabnub Bubber')
})

test('nonexistent topic and #remove return value', t => {

  t.plan(10)

  const pubsub = new PubSub()

  let calls = 0
  let pass = null
  function cb (data) {
    calls++
    pass = data
  }

  const _void = pubsub.on('taste', cb)

  t.is(calls, 0)
  t.is(pass, null)
  t.is(_void, void 0)

  t.throws(pubsub.remove.bind(pubsub, 'tasty', cb))

  const _true = pubsub.remove('taste', cb)
  pubsub.publish('taste')

  t.true(_true)
  t.is(calls, 0)
  t.is(pass, null)

  const _false = pubsub.remove('taste', cb)
  pubsub.publish('taste')

  t.false(_false)
  t.is(calls, 0)
  t.is(pass, null)
})
