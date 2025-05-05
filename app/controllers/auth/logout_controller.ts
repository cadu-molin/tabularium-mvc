import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth/auth_service'

@inject()
export default class LoginController {
  constructor(protected authService: AuthService) {}

  async handle({ request, response, auth }: HttpContext) {
    console.log('LogoutController:handle')

    this.authService.logoutUser(auth)
    return response.redirect().back()
  }
}
