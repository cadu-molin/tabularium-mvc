export default class RegisterUserException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RegisterUserException'
  }
}
