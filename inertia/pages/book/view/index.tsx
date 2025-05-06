import { BookDTO } from '#dto/book/book_dto'

export default function ViewBook({ book }: { book: BookDTO }) {
  console.log(book)

  return (
    <div>
      <h1>Edit Book</h1>
      {/* Add form or content for editing a book */}
    </div>
  )
}
