import BookException from '#exceptions/book/book_exception'
import Book from '#models/book'
import logger from '@adonisjs/core/services/logger'
import { DateTime } from 'luxon'

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
        releaseDate: book.releaseDate ? DateTime.fromJSDate(book.releaseDate) : null,
        publisherId: book.publisherId,
      })

      if (!bookSaved) {
        throw new BookException('Erro ao criar o livro')
      }

      bookSaved.related('authors').attach(book.author)

      return bookSaved
    } catch (error) {
      logger.error(error.message)

      throw new BookException(error.message)
    }
  }

  async findAll(): Promise<Book[] | never> {
    try {
      const books = await Book.query().preload('authors').preload('publisher')

      return books
    } catch (error) {
      logger.error(error.message)

      throw new BookException(error.message)
    }
  }

  async findById(id: number): Promise<Book | never> {
    try {
      const book = await Book.findOrFail(id)
      await book.load('authors')
      await book.load('publisher')
      return book
    } catch (error) {
      logger.error('Erro ao buscar o livro:', error)
      throw new BookException('Erro ao buscar o livro')
    }
  }
}
