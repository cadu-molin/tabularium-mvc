import { Head } from '@inertiajs/react'
import Title from '~/components/custom/title'
import BookForm from './components/book_form'
// import DataTableDemo from './components/teste/page'
import MainLayout from '~/layouts/main_layout'
import MainContainerAlternative from '~/components/custom/main_container_alternative'

export default function Book() {
  return (
    <>
      <Head title="Livro" />

      <MainContainerAlternative>
        <Title>Livro</Title>
        <BookForm />
        {/* <DataTableDemo/> */}
      </MainContainerAlternative>
    </>
  )
}

Book.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
