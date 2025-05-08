import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import ReviewCard from './review_card'
import { BookReviewDTO } from '#dto/book_review/book_review_dto'

export default function ReviewSection({ reviews }: { reviews?: Array<BookReviewDTO> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avaliações</CardTitle>
      </CardHeader>
      <CardContent>
        {reviews && reviews.map((review: any) => <ReviewCard key={review.id} review={review} />)}
        {!reviews && (
          <div>
            <h1 className="text-center">Nenhuma avaliação encontrada</h1>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
