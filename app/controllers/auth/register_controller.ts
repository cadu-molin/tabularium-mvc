import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import RegisterService from '#services/auth/register_service'
import { registerFormSchemaValidator } from '#validators/auth/register_validator'
import RegisterUserException from '#exceptions/auth/register_user_exception'
import AuthService from '#services/auth/auth_service'
import type { Result } from '#types/result'
import { RequestError } from '#dto/request_error'
import { RegisterFormDTO } from '#dto/auth/regiter_form_dto'

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

        const responseSuccess: Result<RegisterFormDTO, {}> = {
          success: true,
          data: {
            fullName: user.fullName,
            login: user.login,
          },
        }

        return response.ok(responseSuccess)
      }

      throw new RegisterUserException('Erro ao criar usuário')
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
