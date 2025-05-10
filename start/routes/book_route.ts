import BookController from '#controllers/book/book_controller'
import ReviewController from '#controllers/review/review_controller'
import type { HttpRouterService } from '@adonisjs/core/types'

export default function bookRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/create', [BookController, 'create']).as('create')
      router.get('/list', [BookController, 'list']).as('list')
      router.get('/:id/view', [BookController, 'show']).as('show')

      // Avaliação
      router.get('/:id/review/create', [ReviewController, 'create']).as('review.create')
      router.post('/:id/review/create', [ReviewController, 'store']).as('review.store')
    })
  }
}
