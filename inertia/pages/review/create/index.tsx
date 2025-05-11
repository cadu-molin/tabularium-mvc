import { useEffect, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '~/components/ui/card'
import MainLayout from '~/layouts/main_layout'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import Title from '~/components/custom/title'
import { Star } from 'lucide-react'

const MAX_RATING = 5

export default function CreateReview() {
  const {
    props: { bookId, existingReview, errors = {} },
  } = usePage<{
    bookId: number
    existingReview?: { review: string; rating: number }
    errors?: Record<string, string>
  }>()

  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (existingReview) {
      setReview(existingReview.review)
      setRating(existingReview.rating)
    }
  }, [existingReview])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.post(`/book/${bookId}/review/create`, {
      review,
      rating,
    })
  }

  return (
    <>
      <Head title="Avaliar Livro" />
      <MainContainerAlternative>
        <Title className="mb-6">Avaliação</Title>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <Card className="w-[400px]">
              <CardHeader>
                <CardTitle>Avaliar Livro</CardTitle>
                <CardDescription>
                  Escreva sua resenha e dê uma nota para este livro.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="review">Comentário</Label>
                  <Input
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Escreva sua resenha aqui..."
                    className={errors.review ? 'border-red-500' : ''}
                  />
                  {errors.review && (
                    <p className="text-sm text-red-500">{errors.review}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="rating">Nota</Label>
                  <div className="flex gap-1">
                    {Array.from({ length: MAX_RATING }, (_, i) => i + 1).map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-sm text-red-500">{errors.rating}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit"> {existingReview ? 'Atualizar Avaliação' : 'Enviar Avaliação'}</Button>
                <Button variant="default" type="button" onClick={() => history.back()}>
                  Cancelar
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </MainContainerAlternative>
    </>
  )
}

CreateReview.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
