import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import BookService from '#services/book/book_service'
import { bookFormSchemaValidator } from '#validators/book/book_validator'
import type { Result } from '#types/result'
import { RequestError } from '#dto/request_error'
import { BookFormDTO } from '#dto/book/book_form_dto'
import { DateTime } from 'luxon'
import { BookDTO, createBookDTOFromModel } from '#dto/book/book_dto'
import { createBookReviewDTOFromModel } from '#dto/book_review/book_review_dto'

@inject()
export default class BookController {
  constructor(protected bookService: BookService) {}

  async create({ inertia }: HttpContext) {
    return inertia.render('book/create/index')
  }

  async store({ request, response }: HttpContext) {
    try {
      const { title, edition, releaseDate, publisherId, authorsId } =
        await request.validateUsing(bookFormSchemaValidator)

      const finalReleaseDate = releaseDate ? DateTime.fromJSDate(releaseDate) : null

      const book = await this.bookService.createBook({
        title,
        edition,
        releaseDate: finalReleaseDate,
        publisherId,
        authorsId,
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
      const bookDTO: BookDTO = createBookDTOFromModel(book)
      return bookDTO
    })

    return inertia.render('book/list/index', {
      books: bookListDTO,
    })
  }

  async show({ params, inertia }: HttpContext) {
    const book = await this.bookService.findById(params.id)
    const bookDTO = createBookDTOFromModel(book)

    const bookReviews = await book.related('reviews').query().preload('user')
    const bookReviewsDTO = bookReviews.map((bookReview) => createBookReviewDTOFromModel(bookReview))

    return inertia.render('book/view/index', { book: bookDTO, reviews: bookReviewsDTO })
  }
}
