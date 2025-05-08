import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AuthorService from '#services/author/author_service'
import BookException from '#exceptions/book/book_exception'

type AuthorDTO = {
  id: number
  name: string
}

@inject()
export default class AuthorController {
  constructor(protected authorService: AuthorService) {}

  async list({ response }: HttpContext) {
    try {
      const authors = await this.authorService.findAll()

      const authorListDTO: AuthorDTO[] = authors.map((author) => ({
        id: author.id,
        name: author.name,
      }))

      return response.ok({ authors: authorListDTO })
    } catch (error) {
      throw new BookException('Erro ao buscar autores')
    }
  }
}
