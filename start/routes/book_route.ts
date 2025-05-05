import BookController from '#controllers/book/book_controller'
import type { HttpRouterService } from '@adonisjs/core/types'

export default function bookRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/', [BookController, 'show']).as('show')
    })
  }
}
