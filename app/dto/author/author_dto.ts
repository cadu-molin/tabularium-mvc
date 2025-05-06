import Author from '#models/author'

type AuthorDTO = {
  id: number
  name: string
  createdAt: string
  updatedAt: string | null
}

function createAuthorDTOFromModel(author: Author): AuthorDTO {
  return {
    id: author.id,
    name: author.name,
    createdAt: author.createdAt.toString() || '',
    updatedAt: author.updatedAt?.toString() || '',
  }
}

export type { AuthorDTO }

export { createAuthorDTOFromModel }
