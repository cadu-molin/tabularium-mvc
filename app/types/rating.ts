export default class Rating {
  private constructor(protected _value: number) {}

  public static get MAX_VALUE() {
    return 5
  }

  public static get MIN_VALUE() {
    return 0
  }

  static create(value: number): Rating | never {
    if (value < Rating.MIN_VALUE || value > Rating.MAX_VALUE) {
      throw new Error('Value must be between 0 and 5.')
    }
    return new Rating(value)
  }

  get value() {
    return this._value
  }
}
