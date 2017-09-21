import test from 'ava'

import PubSub from '../dist/PubSub'

test('pre-binding of methods', t => {

  t.plan(18)

  const { on, off, publish } = new PubSub()

  let counter = 0
  let expectedCounter = 0
  function count () { counter++ }

  // 1
  t.notThrows(() => {
    publish('test')
  })

  // 2
  t.is(expectedCounter, counter)

  // 3
  t.notThrows(() => {
    on('test', count)
  })

  // 4
  t.is(expectedCounter, counter)

  // 5
  t.notThrows(() => {
    publish('test')
  })
  expectedCounter++

  // 6
  t.is(expectedCounter, counter)

  // 7
  t.notThrows(() => {
    off('test', count)
  })

  // 8
  t.notThrows(() => {
    publish('test')
  })

  // 9
  t.is(expectedCounter, counter)

  // 10
  t.notThrows(publish.bind(null, 'test2'))

  // 11
  t.is(expectedCounter, counter)

  // 12
  t.notThrows(on.bind(null, 'test2', count))

  // 13
  t.is(expectedCounter, counter)

  // 14
  t.notThrows(publish.bind(null, 'test2'))
  expectedCounter++

  // 15
  t.is(expectedCounter, counter)

  // 16
  t.notThrows(off.bind(null, 'test2', count))

  // 17
  t.notThrows(publish.bind(null, 'test2'))

  // 18
  t.is(expectedCounter, counter)
})
