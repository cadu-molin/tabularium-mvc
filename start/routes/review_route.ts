import type { HttpRouterService } from '@adonisjs/core/types'

export default function reviewRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {})
  }
}
