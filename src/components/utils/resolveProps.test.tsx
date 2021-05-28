import { resolveData, resolveDataProps, resolveProps } from 'components/utils/resolveProps'

describe.only('resolveProps', () => {
  const x = resolveData([], [])
  describe('resolveData', () => {
    test('empty data without props', () => {
      const data: any = []
      const res = [{ id: '', value: '' }]
      expect(resolveData(data)).toEqual(res)
    })
    test('only short data', () => {
      let data = [1, 2, 3]
      let res = [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 }
      ]
      expect(resolveData(data)).toEqual(res)
      data = [1, 2]
      res = [
        { id: 1, value: 1 },
        { id: 2, value: 2 }
      ]
      expect(resolveData(data)).toEqual(res)
    })
    test('short data with dataProps', () => {
      const data = [1, 2, 3]
      const dataProps = { id: 'testValue' }
      const res = [
        { id: 1, testValue: 1 },
        { id: 2, testValue: 2 },
        { id: 3, testValue: 3 }
      ]
      expect(resolveData(data, dataProps)).toEqual(res)
    })
    test('short data with empty array to dataProps', () => {
      const data = [1, 2, 3]
      const dataProps: any = []
      const res = [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 }
      ]
      expect(resolveData(data, dataProps)).toEqual(res)
    })
  })
  describe('resolveDataProps', () => {
    test('data without dataProps', () => {
      const data = [
        { id: 1, value: 1, value2: 1 },
        { id: 2, value: 2, value2: 2 },
        { id: 3, value: 3, value2: 3 }
      ]
      const dataProps = [{ id: 'id' }, { id: 'value' }, { id: 'value2' }]
      expect(resolveDataProps(data)).toEqual(dataProps)
    })
  })
  describe('resolveProps', () => {
    const data = [1, 2, 3]
    const res = [
      [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 }
      ],
      [{ id: 'id' }, { id: 'value' }]
    ]
    expect(resolveProps({ data })).toEqual(res)
  })
})
