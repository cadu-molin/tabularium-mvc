import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import BookService from '#services/book/book_service'
import { bookFormSchemaValidator } from '#validators/book/book_validator'
import BookException from '#exceptions/book/book_exception'
import type { Result } from '#types/result'
import { RequestError } from '#dto/request_error'
import { BookFormDTO } from '#dto/book/book_form_dto'
import { BookListDTO } from '#dto/book/book_list_dto'
import { AuthorDTO } from '#dto/author/author_dto'
import { DateTime } from 'luxon'

@inject()
export default class BookController {
  constructor(protected bookService: BookService) {}

  async show({ inertia }: HttpContext) {
    return inertia.render('book/create/index')
  }

  async store({ request, response }: HttpContext) {
    try {
      const {
        title,
        edition,
        releaseDate,
        publisherId,
        authorIds,
      } = await request.validateUsing(bookFormSchemaValidator)

      const finalReleaseDate = releaseDate ? DateTime.fromJSDate(releaseDate) : null

      const book = await this.bookService.createBook({
        title,
        edition,
        releaseDate: finalReleaseDate,
        publisherId,
        authorIds,
      })

      // Carrega os autores antes de retornar
      await book.load('authors')

      const responseSuccess: Result<BookFormDTO, {}> = {
        success: true,
        data: {
          title: book.title,
          edition: book.edition,
          releaseDate: book.releaseDate,
          publisherId: book.publisherId,
          authorIds: book.authors.map((a) => a.id),
        },
      }

      return response.ok(responseSuccess)
    } catch (error) {
      const errorResquest: RequestError = {
        message: error.message,
      }

      const responseError: Result<{}, RequestError> = {
        success: false,
        error: errorResquest,
      }

      return response.internalServerError(responseError)
    }
  }


  async list({ inertia, auth }: HttpContext) {
    const books = await this.bookService.findAll()

    const bookListDTO = books.map((book) => {
      const bookDTO: BookListDTO = {
        id: book.id,
        title: book.title,
        edition: book.edition,
        releaseDate: book.releaseDate?.toString() || '',
        publisherId: book.publisherId,
        authors: book.authors.map((author) => {
          const authorDTO: AuthorDTO = {
            id: author.id,
            name: author.name,
            createdAt: author.createdAt.toString() || '',
            updatedAt: author.updatedAt?.toString() || '',
          }

          return authorDTO
        }),
        publisher: {
          id: book.publisher.id,
          name: book.publisher.name,
          createdAt: book.publisher.createdAt.toString() || '',
          updatedAt: book.publisher.updatedAt?.toString() || '',
        },
        rating: 8,
        createdAt: book.createdAt.toString() || '',
        updatedAt: book.updatedAt?.toString() || '',
      }
      return bookDTO
    })

    return inertia.render('book/list/index', {
      books: bookListDTO,
    })
  }
}
