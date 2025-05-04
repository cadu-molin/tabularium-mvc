import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used to authenticate HTTP requests and redirect
 * logged-in users to another route.
 */
export default class UserLoggedMiddleware {
  /**
   * The URL to redirect to, when the user is already logged in
   */
  redirectTo = '/profile'

  async handle(ctx: HttpContext, next: NextFn) {
    const { auth, response } = ctx

    // Check if the user is logged in
    if (await auth.check()) {
      return response.redirect(this.redirectTo)
    }

    // Proceed to the next middleware or controller
    await next()
  }
}
