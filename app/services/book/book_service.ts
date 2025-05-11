import BookException from '#exceptions/book/book_exception'
import Book from '#models/book'
import BookReview from '#models/book_review'
import Publisher from '#models/publisher'
import logger from '@adonisjs/core/services/logger'
import { DateTime } from 'luxon'

import db from '@adonisjs/lucid/services/db'

interface CreateBookParams {
  title: string
  edition: string
  releaseDate: DateTime | null
  publisherId: number
  authorsId: number[]
}

type QueryRating = {
  bookId: number
  rating: number
}

export default class BookService {
  constructor() {}

  async createBook(book: CreateBookParams): Promise<Book> {
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

      // Relacionamento correto é "authors", e deve-se usar await
      await bookSaved.related('authors').attach(book.authorsId)

      return bookSaved
    } catch (error) {
      logger.error(error.message)

      throw new BookException('Erro ao criar o livro: ' + error.message)
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

  async findAllPublishers(): Promise<Publisher[]> {
    try {
      return await Publisher.query().orderBy('name', 'asc')
    } catch (error) {
      logger.error('Erro ao buscar os publishers:', error)
      throw new BookException('Erro ao buscar os publishers')
    }
  }

  async deleteBook(id: number): Promise<void> {
    try {
      await Book.query().where('id', id).delete()
    } catch (error) {
      logger.error('Erro ao deletar o livro:', error)
      throw new BookException('Erro ao deletar o livro')
    }
  }

  async updateBook(id: number, book: CreateBookParams): Promise<number> {
    try {
      const rowsAffected = await Book.query().where('id', id).update({
        title: book.title,
        edition: book.edition,
        releaseDate: book.releaseDate,
        publisherId: book.publisherId,
      })

      const bookUpdated = await Book.query()
        .where('id', id)
        .preload('authors')
        .preload('publisher')
        .firstOrFail()

      await bookUpdated.related('authors').sync(book.authorsId)

      return rowsAffected.length
    } catch (error) {
      logger.error('Erro ao atualizar o livro:', error)
      throw new BookException('Erro ao atualizar o livro')
    }
  }

  async findAllRatings(): Promise<QueryRating[] | never> {
    try {
      const result = await db.rawQuery(
        'select book_id, avg(rating) as rating from book_review group by book_id;'
      )

      const ratings: QueryRating[] = result.rows.map((row: { book_id: number; rating: number }) => {
        return {
          bookId: Number(row.book_id),
          rating: Number(row.rating),
        }
      })

      return ratings
    } catch (error) {
      logger.error('Erro ao buscar os ratings:', error)
      throw new BookException('Erro ao buscar os ratings')
    }
  }
}
