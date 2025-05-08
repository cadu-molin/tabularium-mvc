import BookReview from '#models/book_review'
import Rating from '#types/rating'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await BookReview.createMany([
      {
        bookId: 1,
        userId: 2,
        rating: Rating.create(5),
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quas.',
      },
      {
        bookId: 1,
        userId: 1,
        rating: Rating.create(4),
        review: 'sdassd',
      },
    ])
  }
}
