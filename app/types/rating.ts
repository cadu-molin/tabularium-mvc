export default class Rating {
  private constructor(protected _value: number) {}

  public static get MAX_VALUE() {
    return 5
  }

  static create(value: number): Rating | never {
    if (value < 0 || value > 5) {
      throw new Error('Value must be between 0 and 5.')
    }
    return new Rating(value)
  }

  get value() {
    return this._value
  }
}
