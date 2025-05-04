import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { loginFormSchemaValidator } from '#validators/auth/login_validator'
import AuthService from '#services/auth/auth_service'
import type { Result } from '#types/result'
import { RequestError } from '#dto/request_error'
import { LoginFormDTO } from '#dto/auth/login_form_dto'
import LoginUserException from '#exceptions/auth/login_user_exception'

@inject()
export default class LoginController {
  constructor(protected authService: AuthService) {}

  async show({ inertia }: HttpContext) {
    return inertia.render('auth/login/index')
  }

  async store({ request, response, auth, session }: HttpContext) {
    try {
      const { login, password } = await request.validateUsing(loginFormSchemaValidator)

      const user = await this.authService.verifyCredentials(login, password)

      if (user) {
        await this.authService.loginUser(user, auth)

        const responseSuccess: Result<LoginFormDTO, {}> = {
          success: true,
          data: {
            fullName: user.fullName,
            login: user.login,
          },
        }

        return response.ok(responseSuccess)
      }

      throw new LoginUserException('Erro ao logar usuário')
    } catch (error) {
      const errorResquest: RequestError = {
        message: error.message,
      }

      const responseError: Result<{}, RequestError> = {
        success: false,
        error: errorResquest,
      }

      return response.internalServerError(responseError)
    }
  }
}
