export default class LoginUserException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LoginUserException'
  }
}
