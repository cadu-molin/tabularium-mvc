import BookController from '#controllers/book/book_controller'
import ReviewController from '#controllers/review/review_controller'
import type { HttpRouterService } from '@adonisjs/core/types'

export default function bookRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/create', [BookController, 'create']).as('create')
      router.post('/create', [BookController, 'store']).as('store')
      router.delete('/:id', [BookController, 'delete']).as('delete')

      router.get('/:id/view', [BookController, 'show']).as('show')
      router.get('/:id/edit', [BookController, 'edit']).as('edit')
      router.put('/:id', [BookController, 'update']).as('update')

      router.get('/list', [BookController, 'list']).as('list')

      // Avaliação
      router.get('/:id/review/create', [ReviewController, 'create']).as('review.create')
      router.post('/:id/review/create', [ReviewController, 'store']).as('review.store')
    })
  }
}
