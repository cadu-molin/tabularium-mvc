import { BookReviewDTO } from '#dto/book_review/book_review_dto'
import Rating from '#types/rating'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

import { Star } from 'lucide-react'

export default function ReviewCard({ review }: { review: BookReviewDTO }) {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>{review.user.fullName}</CardTitle>
        <CardDescription className="flex">
          {Array.from({ length: Rating.MAX_VALUE }, (_, i) => i + 1).map((i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i <= review.rating.value ? 'fill-yellow-400' : ''}`}
            />
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>{review.review}</CardContent>
    </Card>
  )
}
