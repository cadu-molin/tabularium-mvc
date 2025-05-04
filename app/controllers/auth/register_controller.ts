import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import RegisterService from '#services/auth/register_service'
import { registerFormSchemaValidator } from '#validators/auth/register_validator'
import RegisterUserException from '#exceptions/auth/register_user_exception'
import AuthService from '#services/auth/auth_service'

@inject()
export default class RegisterController {
  constructor(
    protected registerService: RegisterService,
    protected authService: AuthService
  ) {}

  async show({ inertia }: HttpContext) {
    return inertia.render('auth/register/index')
  }

  async store({ request, response, auth, session }: HttpContext) {
    try {
      const { fullName, login, password } = await request.validateUsing(registerFormSchemaValidator)

      const user = await this.registerService.registerUser({
        fullName,
        login,
        password,
      })

      if (user) {
        await this.authService.loginUser(user, auth)
        session.flash('success', 'Usuário criado com sucesso')
        return response.redirect().toRoute('home')
      }

      throw new RegisterUserException('Erro ao criar usuário')
    } catch (error) {
      return response.status(422).send(error.message)
      // return response.redirect().back()
    }
  }
}
