import type { HttpRouterService } from '@adonisjs/core/types'

import RegisterController from '#controllers/auth/register_controller'
import LoginController from '#controllers/auth/login_controller'

export default function authRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/register', [RegisterController, 'show']).as('register.show')
      router.post('/register', [RegisterController, 'store']).as('register.store')
    })

    router.group(() => {
      router.get('/login', [LoginController, 'show']).as('login.show')
      router.post('/login', [LoginController, 'store']).as('login.store')
    })
  }
}
