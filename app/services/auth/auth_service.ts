import LoginUserException from '#exceptions/auth/login_user_exception'
import User from '#models/user'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import logger from '@adonisjs/core/services/logger'

export default class AuthService {
  constructor() {}

  async loginUser(userLogin: User, auth: Authenticator<Authenticators>): Promise<void> {
    try {
      await auth.use('web').login(userLogin)
      return
    } catch (error) {
      logger.error('loginUser:', JSON.stringify(error))
      throw new LoginUserException('Erro ao criar usuário')
    }
  }

  async verifyCredentials(login: string, password: string): Promise<User | null> {
    try {
      const user = await User.verifyCredentials(login, password)

      return user
    } catch (error) {
      logger.error('verifyCredentials:', JSON.stringify(error))
      throw new LoginUserException('Erro ao verificar credenciais')
    }
  }
}
