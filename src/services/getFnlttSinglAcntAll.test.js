import { expect } from 'chai'
import * as x from './getFnlttSinglAcntAll.js'

describe('fnlttSinglAcntAll', () => {
  it('fnlttSinglAcntAll', async () => {
    const search = {
      corp_code: '00126380',
      bsns_year: '2018',
      reprt_code: '11011',
      fs_div: 'OFS'
    }
    const res = await x.fnlttSinglAcntAll(search)
    expect(res).to.be.a('object')
  })
})
