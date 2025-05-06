import { AuthorDTO, createAuthorDTOFromModel } from '#dto/author/author_dto'
import { createPublisherDTOFromModel, PublisherDTO } from '#dto/publisher/publisher_dto'
import Book from '#models/book'

type BookDTO = {
  id: number
  title: string
  edition: string
  releaseDate: string | null
  publisherId: number
  authors: AuthorDTO[]
  publisher: PublisherDTO
  rating: number | null
  createdAt: string
  updatedAt: string | null
}

function createBookDTOFromModel(book: Book): BookDTO {
  return {
    id: book.id,
    title: book.title,
    edition: book.edition,
    releaseDate: book.releaseDate?.toString() || '',
    publisherId: book.publisherId,
    authors: book.authors.map((author) => {
      return createAuthorDTOFromModel(author)
    }),
    publisher: createPublisherDTOFromModel(book.publisher),
    rating: 8,
    createdAt: book.createdAt.toString() || '',
    updatedAt: book.updatedAt?.toString() || '',
  }
}

export type { BookDTO }

export { createBookDTOFromModel }
