import AuthorController from '#controllers/author/author_controller'
import type { HttpRouterService } from '@adonisjs/core/types'

export default function AuthorRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/authors', [AuthorController, 'list']).as('list')
    })
  }
}
