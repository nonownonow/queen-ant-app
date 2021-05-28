import { storage } from 'utils/index'

type EntryPoint = 'kim_po' | 'jang_gi';

export default class Entry {
  constructor (public entry?: EntryPoint) {}
  get _entry () {
    return storage.get('entry') as EntryPoint
  }

  set _entry (entry: EntryPoint) {
    storage.set('entry', entry)
    this.entry = entry
  }
}
