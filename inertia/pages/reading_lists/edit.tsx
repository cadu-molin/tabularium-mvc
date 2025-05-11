import { Head, router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import Title from '~/components/custom/title'
import MainLayout from '~/layouts/main_layout'
import ReadingListForm from './components/reading_list_form'
import EditBooks from './components/edit_books'
import { PageProps, ReadingListWithBooks } from './types'

export default function EditReadingList() {
  const { readingList, allBooks } = usePage<PageProps & { allBooks: { id: number; title: string }[] }>().props

  if (!readingList || !('books' in readingList)) return null
  const listWithBooks = readingList as ReadingListWithBooks

  // Estado local para alterações
  const [formData, setFormData] = useState({
    name: readingList.name,
    description: readingList.description || '',
  })
  const [selectedToAdd, setSelectedToAdd] = useState<number[]>([])
  const [pendingAdd, setPendingAdd] = useState<number[]>([])
  const [toRemove, setToRemove] = useState<number[]>([])

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    router.put(`/reading-lists/${readingList.id}`, {
      ...formData,
      add_books: pendingAdd,
      remove_books: toRemove,
    })
  }

  const handleDeleteList = () => {
    if (confirm('Tem certeza que deseja eliminar esta lista? Esta ação não pode ser desfeita.')) {
      router.delete(`/reading-lists/${readingList.id}`, {
        onSuccess: () => router.visit('/reading-lists')
      })
    }
  }

  return (
    <>
      <Head title="Editar Lista" />
      <MainContainerAlternative>
        <Title>Editar Lista</Title>
        <div className="flex justify-center">
          <div className="w-[600px]">
            <div className="flex justify-end mb-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                onClick={handleDeleteList}
                type="button"
              >
                Eliminar lista
              </button>
            </div>
            <ReadingListForm
              data={formData}
              setData={handleFormChange}
              submitLabel="Salvar alterações"
            />
            <EditBooks
              books={listWithBooks.books}
              allBooks={allBooks || []}
              selectedToAdd={selectedToAdd}
              setSelectedToAdd={setSelectedToAdd}
              toRemove={toRemove}
              setToRemove={setToRemove}
              pendingAdd={pendingAdd}
              setPendingAdd={setPendingAdd}
            />
            <div className="flex justify-end mt-6">
              <button
                className="bg-primary text-white px-4 py-2 rounded text-sm"
                onClick={handleSubmit}
                type="button"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      </MainContainerAlternative>
    </>
  )
}

EditReadingList.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
