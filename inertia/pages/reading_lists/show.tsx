import { Head, router, usePage } from '@inertiajs/react'
import MainContainer from '~/components/custom/main_container'
import Title from '~/components/custom/title'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export default function ShowReadingList() {
  const { readingList } = usePage().props as {
    readingList: {
      id: number
      name: string
      description?: string
      books: { id: number; title: string; author: string }[]
    }
  }

  return (
    <>
      <Head title={`Lista: ${readingList.name}`} />
      <MainContainer>
        <div className="flex items-center justify-between mb-4">
          <Title>{readingList.name}</Title>
          <Button onClick={() => router.visit(`/reading-lists/${readingList.id}/edit`)}>Editar</Button>
        </div>
        <p className="text-muted-foreground mb-6">{readingList.description}</p>

        <Title className="text-lg">Livros</Title>
        <div className="grid gap-4 mt-2">
          {readingList.books.map((book) => (
            <Card key={book.id}>
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Autor: {book.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </MainContainer>
    </>
  )
}
