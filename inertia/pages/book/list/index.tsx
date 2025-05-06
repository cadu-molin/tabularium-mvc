import { BookDTO } from '#dto/book/book_dto'
import { Button } from '~/components/ui/button'
import BookCard from './components/book_card'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import { BookOpen } from 'lucide-react'
import { Head, router } from '@inertiajs/react'
import MainLayout from '~/layouts/main_layout'
import Title from '~/components/custom/title'

export default function ListBook({ books }: { books: BookDTO[] }) {
  return (
    <>
      <Head title="Buscar livros" />
      <MainContainerAlternative>
        <Title className="mb-4">Buscar Livros</Title>

        <div className="p-4 flex flex-row-reverse">
          <Button onClick={() => router.visit('/book')} variant="default">
            <BookOpen className="mr-2 h-4 w-4" />
            Cadastrar novo livro
          </Button>
        </div>
        <div>
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </MainContainerAlternative>
    </>
  )
}

ListBook.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
