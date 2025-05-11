import { Head } from '@inertiajs/react'
import Title from '~/components/custom/title'
import BookEditForm from './components/book_edit_form'
import MainLayout from '~/layouts/main_layout'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import { QueryProviders } from './components/query_provider'
import { PublisherDTO } from '#dto/publisher/publisher_dto'
import { AuthorDTO } from '#dto/author/author_dto'
import { BookDTO } from '#dto/book/book_dto'

interface BookProps {
  book: BookDTO
  publishers: PublisherDTO[]
  authors: AuthorDTO[]
}

export default function EditBook({ book, publishers, authors }: BookProps) {
  return (
    <>
      <Head title="Editar Livro" />

      <MainContainerAlternative>
        <Title>Livro</Title>
        <BookEditForm book={book} publishers={publishers} authors={authors} />
      </MainContainerAlternative>
    </>
  )
}

EditBook.layout = (page: React.ReactNode) => (
  <MainLayout>
    <QueryProviders>{page}</QueryProviders>
  </MainLayout>
)
