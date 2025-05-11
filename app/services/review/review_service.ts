import Review from '#models/book_review'
import Rating from '#types/rating'

interface CreateReviewParams {
  review: string
  rating: number
  userId: number
  bookId: number
}

export default class ReviewService {
  async create({ review, rating, userId, bookId }: CreateReviewParams) {
    const ratingInstance = Rating.create(Number(rating))

    return Review.updateOrCreate(
      { bookId, userId }, // Critérios de busca
      { review, rating: ratingInstance } // Dados para inserir ou atualizar
    )
  }
}
