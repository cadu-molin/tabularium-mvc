import { Head, router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import Title from '~/components/custom/title'
import MainLayout from '~/layouts/main_layout'
import ReadingListForm from './components/reading_list_form'
import EditBooks from './components/edit_books'

export default function CreateReadingList() {
  const { allBooks } = usePage<{ allBooks: { id: number; title: string }[] }>().props
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [selectedToAdd, setSelectedToAdd] = useState<number[]>([])

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    router.post('/reading-lists', {
      ...formData,
      book_ids: selectedToAdd,
    })
  }

  return (
    <>
      <Head title="Nova Lista de Leitura" />
      <MainContainerAlternative>
        <Title>Criar Nova Lista</Title>
        <div className="flex justify-center">
          <div className="w-[600px]">
            <ReadingListForm
              data={formData}
              setData={handleFormChange}
              submitLabel="Criar"
            />
            <EditBooks
              books={[]}
              allBooks={allBooks || []}
              selectedToAdd={selectedToAdd}
              setSelectedToAdd={setSelectedToAdd}
              toRemove={[]}
              setToRemove={() => {}}
            />
            <div className="flex justify-end mt-6">
              <button
                className="bg-primary text-white px-4 py-2 rounded text-sm"
                onClick={handleSubmit}
                type="button"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      </MainContainerAlternative>
    </>
  )
}

CreateReadingList.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
