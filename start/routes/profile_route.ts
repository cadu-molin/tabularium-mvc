import ProfileController from '#controllers/profile/profile_controller'
import type { HttpRouterService } from '@adonisjs/core/types'

export default function profileRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/', [ProfileController, 'show']).as('show')
    })
  }
}
