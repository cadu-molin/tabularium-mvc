import RegisterUserException from '#exceptions/auth/register_user_exception'
import User from '#models/user'
import logger from '@adonisjs/core/services/logger'

interface RegisterUserParms {
  fullName: string
  login: string
  password: string
}

export default class RegisterService {
  constructor() {}

  async registerUser(userRegister: RegisterUserParms): Promise<User | never> {
    try {
      const userExists = await User.findBy('login', userRegister.login)
      if (userExists) {
        throw new RegisterUserException('Usuário já existe')
      }

      const user = await User.create(userRegister)
      return user
    } catch (error) {
      logger.error(error.message)
      throw new RegisterUserException(error.message)
    }
  }
}
