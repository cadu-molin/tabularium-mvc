import type { HttpRouterService } from '@adonisjs/core/types'

import RegisterController from '#controllers/auth/register_controller'

export default function authRoute(router: HttpRouterService) {
  return () => {
    router.get('/register', [RegisterController, 'show']).as('register.show')
    router.post('/register', [RegisterController, 'store']).as('register.store')
  }
}
