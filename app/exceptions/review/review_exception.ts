export default class ReviewException extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'ReviewException'
    }
  }
  