import { AuthorDTO } from '#dto/author/author_dto'
import { PublisherDTO } from '#dto/publisher/publisher_dto'

type BookListDTO = {
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

export type { BookListDTO }
