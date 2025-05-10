import { Head, router } from '@inertiajs/react'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import Title from '~/components/custom/title'
import MainLayout from '~/layouts/main_layout'
import ReadingListForm from './components/reading_list_form'

export default function CreateReadingList() {
  const handleSubmit = (data: { name: string; description: string }) => {
    router.post('/reading-lists', data)
  }

  return (
    <>
      <Head title="Nova Lista de Leitura" />
      <MainContainerAlternative>
        <Title>Criar Nova Lista</Title>
        <ReadingListForm onSubmit={handleSubmit} submitLabel="Criar" />
      </MainContainerAlternative>
    </>
  )
}

CreateReadingList.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
