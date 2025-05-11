import ReviewController from '#controllers/review/review_controller'
import type { HttpRouterService } from '@adonisjs/core/types'

export default function reviewRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/create', [ReviewController, 'create']).as('create')
    })
  }
}
