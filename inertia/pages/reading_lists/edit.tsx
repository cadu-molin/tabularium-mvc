import { Head, router, usePage } from '@inertiajs/react'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import Title from '~/components/custom/title'
import MainLayout from '~/layouts/main_layout'
import ReadingListForm from './components/reading_list_form'
import { PageProps } from './types'

export default function EditReadingList() {
  const { readingList } = usePage<PageProps>().props

  const handleSubmit = (data: { name: string; description: string }) => {
    router.put(`/reading-lists/${readingList?.id}`, data)
  }

  return (
    <>
      <Head title="Editar Lista" />
      <MainContainerAlternative>
        <Title>Editar Lista</Title>
        <ReadingListForm
          initialData={readingList}
          onSubmit={handleSubmit}
          submitLabel="Salvar alterações"
        />
      </MainContainerAlternative>
    </>
  )
}

EditReadingList.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
