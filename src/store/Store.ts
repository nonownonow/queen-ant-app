import { Dispatch } from 'react'

export class Store {
  private dispatch: Dispatch<any>;
  private StateStore: any;

  constructor (stateStore: any) {
    this.StateStore = stateStore
  }

  static getNullStore (Store: any) {
    const getterHandler = {
      get (target: any, prop: any, receiver: any) {
        const value =
          target[prop] === undefined || isNaN(target[prop])
            ? null
            : target[prop]
        return value && value
      }
    }
    const constructorhandler = {
      construct (target: any, args: any) {
        function C (...args: any) {
          return new Proxy(new target(...args), getterHandler)
        }

        C.prototype = new Proxy(target.prototype, getterHandler)
        // @ts-ignore
        return new C(...args)
      }
    }
    return new Proxy(Store, constructorhandler)
  }

  init (_dispatch: Dispatch<any>, initStore: any) {
    this.dispatch = _dispatch
    this.setStore(initStore)
  }

  setStore (newState = {}) {
    if (this.dispatch !== undefined) {
      return this.dispatch(
        (state: any) => new this.StateStore({ ...state, ...newState })
      )
    }
  }
}
