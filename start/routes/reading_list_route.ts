import ReadingListController from '#controllers/reading_list/reading_list_controller'
import type { HttpRouterService } from '@adonisjs/core/types'

export default function readingListRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/', [ReadingListController, 'index']).as('index')
      router.get('/create', [ReadingListController, 'create']).as('create')
      router.post('/', [ReadingListController, 'store']).as('store')
      router.get('/:id', [ReadingListController, 'show']).as('show')
      router.get('/:id/edit', [ReadingListController, 'edit']).as('edit')
      router.put('/:id', [ReadingListController, 'update']).as('update')
      router.delete('/:id', [ReadingListController, 'destroy']).as('destroy')
      router.post('/:id/books', [ReadingListController, 'addBook']).as('addBook')
      router.delete('/:id/books/:bookId', [ReadingListController, 'removeBook']).as('removeBook')
    })
  }
}
