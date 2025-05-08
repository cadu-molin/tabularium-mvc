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
