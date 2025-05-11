import { BookOpen, Bookmark, Share2, Star, Trash } from 'lucide-react'

import { useState } from 'react'

import { BookDTO } from '#dto/book/book_dto'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { router } from '@inertiajs/react'

export default function BookCard({ book }: { book: BookDTO }) {
  const [isSaved, setIsSaved] = useState(false)

  // Função para formatar a data de lançamento
  const formatReleaseDate = (dateString: string | null) => {
    if (!dateString) return 'Não informado'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
    }).format(date)
  }

  const handleDelete = (bookId: number) => {
    router.delete(`/book/${bookId}`)
  }

  return (
    <Card className="flex flex-col min-w-sm h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-row p-4 gap-4">
        {/* Capa do livro */}
        <div className="relative min-w-[100px] h-[150px]">
          <BookOpen className="absolute inset-0 w-full h-full object-cover rounded-md" />
        </div>

        {/* Informações do livro */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <CardHeader className="p-0 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                <CardDescription className="text-sm mt-1">
                  {book.authors.map((author) => author.name).join(', ')}
                </CardDescription>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{book.rating?.toFixed(1) || '0'}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-1">
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="flex items-center gap-1">
                <span className="font-medium">Editora:</span> {book.publisher.name}
              </p>
              <p className="flex items-center gap-1">
                <span className="font-medium">Edição:</span> {book.edition}
              </p>
              <p className="flex items-center gap-1">
                <span className="font-medium">Lançamento:</span>{' '}
                {formatReleaseDate(book.releaseDate)}
              </p>
            </div>
          </CardContent>
        </div>
      </div>

      <CardFooter className="flex justify-between p-3 pt-0 mt-auto border-t">
        <div className="w-full flex flex-col">
          <Button onClick={() => router.visit('edit')} variant="default" className="flex-1 w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            Editar cadastro
          </Button>
          <Button
            onClick={() => router.visit('review/create')}
            variant="default"
            className="flex-1 w-full mt-4"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Avaliar
          </Button>
        </div>

        <div className="flex gap-2 ml-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className={isSaved ? 'text-primary' : ''}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-primary' : ''}`} />
          </Button>

          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button onClick={() => handleDelete(book.id)} variant="destructive" size="icon">
            <Trash />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
