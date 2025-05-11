import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

interface Book {
  id: number
  title: string
}

interface EditBooksProps {
  books: Book[]
  allBooks: Book[]
  selectedToAdd: number[]
  setSelectedToAdd: (ids: number[]) => void
  toRemove: number[]
  setToRemove: (ids: number[]) => void
  pendingAdd?: number[]
  setPendingAdd?: (ids: number[]) => void
  loading?: boolean
}

export default function EditBooks({ books, allBooks, selectedToAdd, setSelectedToAdd, toRemove, setToRemove, pendingAdd = [], setPendingAdd = () => {}, loading }: EditBooksProps) {
  const [search, setSearch] = useState('')

  // Livros que ainda não estão na lista nem na lista de pendentes para adicionar
  const availableBooks = allBooks.filter(
    (book) => !books.some((b) => b.id === book.id) && !pendingAdd.includes(book.id)
  )

  // Filtrar pelo termo de busca
  const filteredBooks = availableBooks.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (option) => Number(option.value))
    setSelectedToAdd(values)
  }

  const handleRemoveToggle = (bookId: number) => {
    if (toRemove.includes(bookId)) {
      setToRemove(toRemove.filter((id) => id !== bookId))
    } else {
      setToRemove([...toRemove, bookId])
    }
  }

  const handleAddPending = () => {
    setPendingAdd([...(pendingAdd || []), ...selectedToAdd])
    setSelectedToAdd([])
  }

  const handleRemovePending = (bookId: number) => {
    setPendingAdd((pendingAdd || []).filter((id) => id !== bookId))
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Livros na Lista</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Livros já na lista */}
        <div className="space-y-2 mb-4">
          {books.length === 0 && <p className="text-muted-foreground text-sm">Nenhum livro adicionado ainda.</p>}
          {books.map((book) => (
            <div key={book.id} className={`flex items-center justify-between border rounded px-2 py-1 ${toRemove.includes(book.id) ? 'bg-red-100' : ''}`}>
              <span>{book.title}</span>
              <Button
                variant={toRemove.includes(book.id) ? 'secondary' : 'destructive'}
                size="sm"
                onClick={() => handleRemoveToggle(book.id)}
                disabled={loading}
              >
                {toRemove.includes(book.id) ? 'Desfazer remoção' : 'Marcar para remover'}
              </Button>
            </div>
          ))}
        </div>
        {/* Livros a adicionar */}
        {pendingAdd.length > 0 && (
          <>
            <div className="mb-2 font-semibold text-green-700">Livros a adicionar</div>
            <div className="space-y-2 mb-4">
              {allBooks.filter((b) => pendingAdd.includes(b.id)).map((book) => (
                <div key={book.id} className="flex items-center justify-between border rounded px-2 py-1 bg-green-50">
                  <span>{book.title}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemovePending(book.id)}
                    disabled={loading}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
        {/* Card de adicionar livro */}
        <Card className="mb-2">
          <CardHeader>
            <CardTitle>Adicionar Livro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar livro pelo nome..."
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="flex gap-2 items-center">
              <select
                multiple
                value={selectedToAdd.map(String)}
                onChange={handleSelectChange}
                className="w-full border rounded px-2 py-1"
                size={Math.min(5, filteredBooks.length)}
              >
                {filteredBooks.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
              <Button
                onClick={handleAddPending}
                disabled={selectedToAdd.length === 0 || loading}
                type="button"
              >
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
} 