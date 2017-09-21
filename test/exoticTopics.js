import test from 'ava'

import PubSub from '../dist/PubSub'

const exoticNames = [
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__lookupSetter__',
  '__proto__',
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
]

test('exotic topic names', t => {

  t.plan(exoticNames.length * 7)

  const p = new PubSub()

  let counter = 0
  let expectedCounter = 0

  function count () {
    counter++
  }

  exoticNames.forEach(exoticName => {

    t.notThrows(() => {
      p.on(exoticName, count)
    }) // 1

    t.is(expectedCounter, counter) // 2

    t.notThrows(() => {
      p.publish(exoticName)
    }) // 3
    expectedCounter++

    t.is(expectedCounter, counter) // 4

    t.notThrows(() => {
      p.off(exoticName, count)
    }) // 5

    t.notThrows(() => {
      p.publish(exoticName)
    }) // 6

    t.is(expectedCounter, counter) // 7
  })
})
