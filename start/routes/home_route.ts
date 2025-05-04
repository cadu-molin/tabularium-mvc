import HomeController from '#controllers/home/home_controller'
import type { HttpRouterService } from '@adonisjs/core/types'

export default function homeRoute(router: HttpRouterService) {
  return () => {
    router.group(() => {
      router.get('/', [HomeController, 'show']).as('home.show')
    })
  }
}
