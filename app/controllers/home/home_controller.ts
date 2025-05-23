import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async show({ inertia }: HttpContext) {
    return inertia.render('home/index')
  }
}
