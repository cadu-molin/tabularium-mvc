export default class Rating {
  private constructor(protected _value: number) {}

  static create(value: number): Rating | never {
    if (value < 0 || value > 10) {
      throw new Error('Value must be between 0 and 10.')
    }
    return new Rating(value)
  }
}
