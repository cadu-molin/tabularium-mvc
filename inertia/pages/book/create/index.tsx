import { Head } from '@inertiajs/react'
import Title from '~/components/custom/title'
import BookForm from './components/book_form'
import MainLayout from '~/layouts/main_layout'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import { QueryProviders } from './components/query_provider'
import { PublisherDTO } from '#dto/publisher/publisher_dto'
import { AuthorDTO } from '#dto/author/author_dto'

interface BookProps {
  publishers: PublisherDTO[]
  authors: AuthorDTO[]
}

export default function Book({ publishers, authors }: BookProps) {
  return (
    <>
      <Head title="Livro" />

      <MainContainerAlternative>
        <Title>Livro</Title>
        <BookForm publishers={publishers} authors={authors} />
      </MainContainerAlternative>
    </>
  )
}

Book.layout = (page: React.ReactNode) => (
  <MainLayout>
    <QueryProviders>{page}</QueryProviders>
  </MainLayout>
)
