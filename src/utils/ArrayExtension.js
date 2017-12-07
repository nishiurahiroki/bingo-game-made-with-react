export default class ArrayExtension {
  static range(from, to) {
    const ar = []
    for (let i=from; i <= to; i++) {
      ar.push(i)
    }
    return ar
  }
}
