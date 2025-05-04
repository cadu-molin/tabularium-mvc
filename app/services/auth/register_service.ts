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
      const user = await User.create(userRegister)
      return user
    } catch (error) {
      logger.error('registerUser:', JSON.stringify(error))
      throw new RegisterUserException('Erro ao criar usuário')
    }
  }
}
