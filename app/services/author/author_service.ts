import BookException from '#exceptions/book/book_exception'
import Author from '#models/author'
import logger from '@adonisjs/core/services/logger'

type AuthorDTO = {
  id: number
  name: string
}

export default class AuthorService {
  constructor() {}

  async findAll(): Promise<AuthorDTO[]> {
    try {
      const authors = await Author.query().select(['id', 'name'])

      return authors.map((author) => ({
        id: author.id,
        name: author.name,
      }))

    } catch (error) {
      const errorMessage = error?.message ?? 'Erro desconhecido ao buscar autores'
      logger.error('Erro ao buscar autores:', error)
      throw new BookException(errorMessage)
    }
  }
}
