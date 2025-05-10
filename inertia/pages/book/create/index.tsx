import { Head } from '@inertiajs/react'
import Title from '~/components/custom/title'
import BookForm from './components/book_form'
import MainLayout from '~/layouts/main_layout'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import { QueryProviders } from './components/query_provider'

export default function Book() {
  return (
    <>
      <Head title="Livro" />

      <MainContainerAlternative>
        <Title>Livro</Title>
        <BookForm />
      </MainContainerAlternative>
    </>
  )
}

Book.layout = (page: React.ReactNode) => (
  <MainLayout>
    <QueryProviders>{page}</QueryProviders>
  </MainLayout>
)
