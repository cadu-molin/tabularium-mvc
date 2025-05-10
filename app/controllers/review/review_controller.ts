import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ReviewService from '#services/review/review_service'
import { reviewFormSchemaValidator } from '#validators/review/review_validator'
import BookReview from '#models/book_review'

@inject()
export default class ReviewController {
  constructor(protected reviewService: ReviewService) {}

  async create({ inertia, params, auth }: HttpContext) {
    const bookId = Number(params.id)
    const userId = auth.user?.id

    let existingReview = null

    if (userId) {
      const review = await BookReview.query()
        .where('bookId', bookId)
        .andWhere('userId', userId)
        .first()

      if (review) {
        existingReview = {
          review: review.review,
          rating: review.rating.value,
        }
      }
    }

    return inertia.render('review/create/index', {
      bookId,
      existingReview,
    })
  }

  async store({ request, response, auth, params }: HttpContext) {
    const { review, rating } = await request.validateUsing(reviewFormSchemaValidator)

    const userId = auth.user?.id
    if (!userId) {
      return response.unauthorized({ message: 'Usuário não autenticado' })
    }

    const bookId = Number(params.id)

    await this.reviewService.create({ review, rating, userId, bookId })

    return response.redirect().toRoute('book.show', { id: bookId })
  }
}
