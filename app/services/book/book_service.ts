import BookException from '#exceptions/book/book_exception'
import Book from '#models/book'
import logger from '@adonisjs/core/services/logger'

interface BookUserParms {
  title: string
  edition: string
  releaseDate: Date | null
  publisherId: number
  author: number[]
}

export default class BookService {
  constructor() {}

  async createBook(book: BookUserParms): Promise<Book | never> {
    try {
      const bookSaved = await Book.create({
        title: book.title,
        edition: book.edition,
        releaseDate: book.releaseDate,
        publisherId: book.publisherId,
      })

      if (!bookSaved) {
        throw new BookException('Erro ao criar o livro')
      }

      bookSaved.related('author').attach(book.author)

      return bookSaved
    } catch (error) {
      logger.error(error.message)

      throw new BookException(error.message)
    }
  }
}
