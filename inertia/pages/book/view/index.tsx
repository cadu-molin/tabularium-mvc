import { BookDTO } from '#dto/book/book_dto'
import { BookReviewDTO } from '#dto/book_review/book_review_dto'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import BookCard from './components/book_card'
import ReviewSection from './components/review_section'
import Rating from '#types/rating'
import MainLayout from '~/layouts/main_layout'

export default function ViewBook({
  book,
  reviews,
}: {
  book: BookDTO
  reviews?: Array<BookReviewDTO>
}) {
  console.log(book)

  const reviewMock: BookReviewDTO = {
    id: 1,
    bookId: 1,
    userId: 1,
    rating: Rating.create(4),
    review:
      'Resenha Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure unde dolorum repellendus sed ducimus laudantium sit, modi dolores dignissimos numquam vel ipsam labore est quo voluptates illo soluta? Rerum, accusamus.',
    user: {
      id: 1,
      fullName: 'Nelson Rodrigues',
      login: 'nelson.rodrigues',
    },
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  }

  reviews = new Array<BookReviewDTO>()

  reviews.push(reviewMock)
  reviews.push(reviewMock)
  reviews.push(reviewMock)

  return (
    <MainContainerAlternative>
      <div>
        <BookCard book={book} />
      </div>
      <div className="mt-4">
        <ReviewSection reviews={reviews}></ReviewSection>
      </div>
    </MainContainerAlternative>
  )
}

ViewBook.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
