import test from 'ava'

import PubSub from '../dist/PubSub'

test('inheritance with api wrapper', t => {

  t.plan(24)

  class Sandwich extends PubSub {

    constructor (data) {
      super()
      this.data = data
    }

    onEat (cb) {
      this.on('eat', cb)
      const that = this
      return () => {
        that.remove('eat', cb)
      }
    }

    eat () {
      this.publish('eat', this.data)
    }
  }

  const sw = new Sandwich(9002)

  let cb1calls = 0
  let cb1pass = null
  function cb1 (d) {
    cb1calls++
    cb1pass = d
  }

  let cb2calls = 0
  let cb2pass = null
  function cb2 (d) {
    cb2calls++
    cb2pass = d
  }

  const rmCb1 = sw.onEat(cb1)
  const rmCb2 = sw.onEat(cb2)

  t.is(cb1calls, 0)
  t.is(cb2calls, 0)
  t.is(cb1pass, null)
  t.is(cb2pass, null)

  sw.eat()

  t.is(cb1calls, 1)
  t.is(cb2calls, 1)
  t.is(cb1pass, 9002)
  t.is(cb2pass, 9002)

  rmCb1()

  t.is(cb1calls, 1)
  t.is(cb2calls, 1)
  t.is(cb1pass, 9002)
  t.is(cb2pass, 9002)

  cb1pass = 80
  sw.eat()

  t.is(cb1calls, 1)
  t.is(cb2calls, 2)
  t.is(cb1pass, 80)
  t.is(cb2pass, 9002)

  rmCb2()

  t.is(cb1calls, 1)
  t.is(cb2calls, 2)
  t.is(cb1pass, 80)
  t.is(cb2pass, 9002)

  sw.eat()

  t.is(cb1calls, 1)
  t.is(cb2calls, 2)
  t.is(cb1pass, 80)
  t.is(cb2pass, 9002)
})
