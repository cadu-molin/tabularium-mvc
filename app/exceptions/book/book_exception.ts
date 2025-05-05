export default class BookException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BookException'
  }
}
