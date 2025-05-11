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
import AuthorService from '#services/author/author_service'

@inject()
export default class BookController {
  constructor(
    protected bookService: BookService,
    protected authorService: AuthorService
  ) {}

  async create({ inertia }: HttpContext) {
    const publishers = await this.bookService.findAllPublishers()
    const authors = await this.authorService.findAll()

    return inertia.render('book/create/index', { publishers, authors })
  }

  async store({ request, response }: HttpContext) {
    try {
      const { title, edition, releaseDate, publisherId, authorsId } =
        await request.validateUsing(bookFormSchemaValidator)

      const finalReleaseDate = releaseDate ? DateTime.fromJSDate(new Date(releaseDate)) : null

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
          releaseDate: book.releaseDate?.toISODate() || null,
          publisherId: book.publisherId,
          authorsId: book.authors.map((a) => a.id),
        },
      }

      return response.ok(responseSuccess)
    } catch (error) {
      console.log(error)
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

  async delete({ params, response }: HttpContext) {
    await this.bookService.deleteBook(params.id)

    return response.redirect().toRoute('book.list')
  }

  async edit({ inertia, params }: HttpContext) {
    const book = await this.bookService.findById(params.id)
    const publishers = await this.bookService.findAllPublishers()
    const authors = await this.authorService.findAll()

    const bookDTO = createBookDTOFromModel(book)

    return inertia.render('book/edit/index', { book: bookDTO, publishers, authors })
  }

  async update({ request, response, params }: HttpContext) {
    try {
      console.log('put', params)

      const { title, edition, releaseDate, publisherId, authorsId } =
        await request.validateUsing(bookFormSchemaValidator)

      const finalReleaseDate = releaseDate ? DateTime.fromJSDate(new Date(releaseDate)) : null

      const rowsAffected = await this.bookService.updateBook(params.id, {
        title,
        edition,
        releaseDate: finalReleaseDate,
        publisherId,
        authorsId,
      })

      if (rowsAffected <= 0) {
        throw new Error('Erro ao atualizar o livro')
      }

      const responseSuccess: Result<BookFormDTO, {}> = {
        success: true,
        data: {
          id: params.id,
          title,
          edition,
          releaseDate: finalReleaseDate?.toISODate() || null,
          publisherId,
          authorsId,
        },
      }

      return response.ok(responseSuccess)
    } catch (error) {
      console.log(error)
      const errorResquest: RequestError = {
        message: error.message,
      }

      const responseError: Result<{}, RequestError> = {
        success: false,
        error: errorResquest,
      }
    }
  }

  async list({ inertia, auth }: HttpContext) {
    const books = await this.bookService.findAll()
    const booksRating = await this.bookService.findAllRatings()

    const bookListDTO = books.map((book) => {
      const bookDTO: BookDTO = createBookDTOFromModel(book)

      const bookRating = booksRating.filter((b) => b.bookId === book.id)[0]

      bookDTO.rating = bookRating ? bookRating.rating : 0

      return bookDTO
    })

    return inertia.render('book/list/index', {
      books: bookListDTO,
    })
  }

  async show({ params, inertia }: HttpContext) {
    const book = await this.bookService.findById(params.id)
    const bookReviews = await book.related('reviews').query().preload('user')

    const totalRating =
      bookReviews.reduce((acc, bookReview) => {
        acc += bookReview.rating.value
        return acc
      }, 0) / bookReviews.length

    const bookDTO = createBookDTOFromModel(book)
    const bookReviewsDTO = bookReviews.map((bookReview) => createBookReviewDTOFromModel(bookReview))

    bookDTO.rating = totalRating

    return inertia.render('book/view/index', { book: bookDTO, reviews: bookReviewsDTO })
  }
}
