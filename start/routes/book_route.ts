import BookController from '#controllers/book/book_controller'
import type { HttpRouterService } from '@adonisjs/core/types'

export default function bookRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/create', [BookController, 'create']).as('create')
      router.get('/list', [BookController, 'list']).as('list')
      router.get('/:id/view', [BookController, 'show']).as('show')
    })
  }
}
