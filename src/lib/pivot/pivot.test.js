import * as x from './pivot.js'
import { keys, maxBy, sel, sumBy } from 'fxjs2'

describe('pivot', () => {
  const coll = [
    { id: 'a1', code: 'c1', name: 'ryu', address: 'seoul', age: 5 },
    { id: 'a2', code: 'c1', name: 'jang', address: 'seoul', age: 2 },
    { id: 'a3', code: 'c1', name: 'kim', address: 'gyunggi', age: 3 }
  ]
  const a1 = new Map([
    ['id', 'a1'],
    ['code', 'c1'],
    ['name', 'ryu'],
    ['address', 'seoul'],
    ['age', 5]
  ])
  const a2 = new Map([
    ['id', 'a2'],
    ['code', 'c1'],
    ['name', 'jang'],
    ['address', 'seoul'],
    ['age', 2]
  ])
  const a3 = new Map([
    ['id', 'a3'],
    ['code', 'c1'],
    ['name', 'kim'],
    ['address', 'gyunggi'],
    ['age', 3]
  ])

  const measure = [
    {
      sumAge: sumBy(sel('age')),
      maxAge: maxBy(sel('age'))
    }
  ]
  const map = x.pivot(coll, dimension)[0]

  it('pivot', () => {
    const map = x.pivot(coll)[0]
    const obj = coll[0]
    expect([...map.keys()].toString()).toEqual(keys(obj).toString())
  })
  it('pivot with dimension', () => {
    const dimension = [
      {
        id: 'address',
        direction: 0
      }
    ]
    /* dimension의 방향이 0=컬럼이면 그룹핑 된 것이 가공되지 않고, dimension으로 생성된 컬렉션을 가지고
     * 이때 이 컬렉션으로 새로 생성되는 테이블은  dimension만을 컬럼으로 가진다. 모든 키값은 사라지고, dimension과 measureKey, measuerValue로 구성된다
     * mesureKey, measureValue는 symbol이다.
     * collection -(pivot) -> grouppingObj(leaf collection) -(pivot)-> colletion =
     * [{measure, [dimension1-a, dimension2-b]: measureValue, [dimension2-a,dimension2-c]:measureValue}]
     *
     * [
     *   {dimension1:a, dimension2:b, measure:국어점수max, measureValue},
     *   {dimension1:a, dimension2:b, measure:avg, measureValue},
     *   {dimension1:a, dimension2:c, measure:sum, measureValue}
     *  {dimensi   on1:a, dimension2:c, measure:국어점수max, measureValue},
     *   {dimension1:a, dimension2:b, measure:avg, measureValue},
     *   {dimension1:a, dimension2:b, measure:sum, measureValue}
     * ]
     * */

    const measureKey = Object.getPropertySymbols(map).find(
      (symbol) => symbol.description === 'measure'
    )
    const measureValueSumAge = Object.getPropertySymbols(map).find(
      (symbol) => symbol.description === 'measureValueSumAge'
    )
    const measureValueMaxAge = Object.getPropertySymbols(map).find(
      (symbol) => symbol.description === 'measureValueMaxAge'
    )
    const res = [
      {
        address: 'seoul',
        [measureKey]: 'sumAge',
        [measureValueSumAge]: 7
      },
      {
        address: 'seoul',
        [measureKey]: 'maxAge',
        [measureValueSumAge]: 5
      },
      {
        address: 'gyunggi',
        [measureKey]: 'sumAge',
        [measureValueSumAge]: 3
      },
      {
        address: 'gyunggi',
        [measureKey]: 'maxAge',
        [measureValueMaxAge]: 3
      }
    ]

    const res2 = [
      {
        [['seoul', 'sumAge']]: 7
      },
      {
        [measureKey]: 'maxAge',
        [measureValueMaxAge]: 3
      }
    ]
    expect(coll, dimension)
  })
  it('pivot with dimension which direction is column', () => {
    const dimension = [
      {
        id: 'address',
        direction: 1
      }
    ]
    const map = x.pivot(coll, dimension)[0]
    const map2 = x.pivot(coll, dimension)[1]

    const measureKey = Object.getPropertySymbols(map).find(
      (symbol) => symbol.description === 'measure'
    )
    const measureValueSumAge = Object.getPropertySymbols(map).find(
      (symbol) => symbol.description === 'measureValueSumAge'
    )
    const measureValueMaxAge = Object.getPropertySymbols(map).find(
      (symbol) => symbol.description === 'measureValueMaxAge'
    )
    const measuerValueSumAgeKeys = [...map.keys()].map(
      (key) => key[1] === measureValueSumAge
    )
    const seoulMeasureValueSumAge = measuerValueSumAgeKeys[0]
    const gyunggiMeasureValueSumAge = measuerValueSumAgeKeys[1]

    const measureValueMaxAgeKeys = [...map.keys()].map(
      (key) => key[1] === measureValueMaxAge
    )
    const seoulMeasureValueMaxAge = measureValueMaxAgeKeys[0]
    const gyunggiMeasureValueMaxAge = measureValueMaxAgeKeys[1]

    const res = [
      [
        [measureKey, 'sumAge'],
        [seoulMeasureValueSumAge, 7],
        [gyunggiMeasureValueSumAge, 3]
      ],
      [
        [measureKey, 'maxAge'],
        [seoulMeasureValueMaxAge, 5],
        [gyunggiMeasureValueMaxAge, 3]
      ]
    ]
  })
  it('pivot with dimensions which id are address, measure and all direction is column', () => {
    const dimension = [
      {
        id: 'address',
        direction: 1
      },
      {
        id: 'measureKey',
        direction: 1
      }
    ]
    const map = x.pivot(coll, dimension)[0]
    const map2 = x.pivot(coll, dimension)[1]

    const measureKey = Object.getPropertySymbols(map).find(
      (symbol) => symbol.description === 'measure'
    )
    const measureValueSumAge = Object.getPropertySymbols(map).find(
      (symbol) => symbol.description === 'measureValueSumAge'
    )
    const measureValueMaxAge = Object.getPropertySymbols(map).find(
      (symbol) => symbol.description === 'measureValueMaxAge'
    )
    const measuerValueSumAgeKeys = [...map.keys()].map(
      (key) => key[1] === measureValueSumAge
    )
    const seoulMeasureValueSumAge = measuerValueSumAgeKeys[0]
    const gyunggiMeasureValueSumAge = measuerValueSumAgeKeys[1]

    const measureValueMaxAgeKeys = [...map.keys()].map(
      (key) => key[1] === measureValueMaxAge
    )
    const seoulMeasureValueMaxAge = measureValueMaxAgeKeys[0]
    const gyunggiMeasureValueMaxAge = measureValueMaxAgeKeys[1]

    const res = [
      [
        [seoulMeasureValueSumAge, 7],
        [gyunggiMeasureValueSumAge, 3],
        [seoulMeasureValueMaxAge, 5],
        [gyunggiMeasureValueMaxAge, 3]
      ]
    ]
  })
  it('pivot with dimensions which id are code address and all which direction is row', () => {
    const dimension = [
      {
        id: 'address',
        direction: 1
      },
      {
        id: 'measureKey',
        direction: 1
      }
    ]
  })
})
