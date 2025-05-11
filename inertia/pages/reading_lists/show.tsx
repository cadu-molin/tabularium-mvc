import { Head, router, usePage } from '@inertiajs/react'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import Title from '~/components/custom/title'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import MainLayout from '~/layouts/main_layout'
import { PageProps, ReadingListWithBooks } from './types'

export default function ShowReadingList() {
  const { readingList } = usePage<PageProps>().props

  if (!readingList || !('books' in readingList)) return null

  const listWithBooks = readingList as ReadingListWithBooks

  return (
    <>
      <Head title={`Lista: ${readingList.name}`} />
      <MainContainerAlternative>
        <Title>{readingList.name}</Title>
        <div className="flex justify-center">
          <div className="w-[600px] space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => router.visit(`/reading-lists/${readingList.id}/edit`)}>
                Editar Lista
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{readingList.description || 'Sem descrição'}</p>
              </CardContent>
            </Card>

            <Title className="text-lg">Livros</Title>
            <div className="space-y-4">
              {listWithBooks.books.length === 0 && (
                <p className="text-muted-foreground text-sm">Nenhum livro adicionado ainda.</p>
              )}
              {listWithBooks.books.map((book) => (
                <Card key={book.id} className="flex flex-col md:flex-row md:items-center md:justify-between hover:bg-accent/50 transition-colors">
                  <div className="flex-1">
                    <CardHeader>
                      <CardTitle>{book.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Autor: {book.author}</p>
                    </CardContent>
                  </div>
                  <div className="p-4 flex items-center justify-end">
                    <Button
                      variant="secondary"
                      onClick={() => router.visit(`/book/${book.id}/view`)}
                    >
                      Ver detalhes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </MainContainerAlternative>
    </>
  )
}

ShowReadingList.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
