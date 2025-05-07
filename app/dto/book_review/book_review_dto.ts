import { createUserDTOFromModel, UserDTO } from '#dto/user/user_dto'
import BookReview from '#models/book_review'
import Rating from '#types/rating'

type BookReviewDTO = {
  id: number
  bookId: number
  userId: number
  rating: Rating
  review: string
  user: UserDTO
  createdAt: string
  updatedAt: string | null
}

function createBookReviewDTOFromModel(bookReview: BookReview): BookReviewDTO {
  return {
    id: bookReview.id,
    bookId: bookReview.bookId,
    userId: bookReview.userId,
    rating: bookReview.rating,
    review: bookReview.review,
    user: createUserDTOFromModel(bookReview.user),
    createdAt: bookReview.createdAt.toString(),
    updatedAt: bookReview.updatedAt?.toString() || '',
  }
}

export type { BookReviewDTO }

export { createBookReviewDTOFromModel }
