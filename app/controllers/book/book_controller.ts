import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import BookService from '#services/book/book_service'
import { bookFormSchemaValidator } from '#validators/book/book_validator'
import BookException from '#exceptions/book/book_exception'
import type { Result } from '#types/result'
import { RequestError } from '#dto/request_error'
import { BookFormDTO } from '#dto/book/book_form_dto'

@inject()
export default class BookController {
  constructor(protected bookService: BookService) {}

  async show({ inertia }: HttpContext) {
    return inertia.render('book/index')
  }

  async store({ request, response, auth, session }: HttpContext) {
    try {
      const { title, edition, releaseDate, publisherId, author } =
        await request.validateUsing(bookFormSchemaValidator)

      const book = await this.bookService.createBook({
        title,
        edition,
        releaseDate,
        publisherId,
        author,
      })

      if (book) {
        const responseSuccess: Result<BookFormDTO, {}> = {
          success: true,
          data: {
            title: book.title,
            edition: book.edition,
            releaseDate: book.releaseDate,
            publisherId: book.publisherId,
            author: book.author,
          },
        }

        return response.ok(responseSuccess)
      }

      throw new BookException('Erro ao criar o livro')
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
}
