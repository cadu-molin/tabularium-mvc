type BookFormDTO = {
  title: string
  edition: string
  releaseDate: string | null
  publisherId: number
  authorsId: number[]
}

export type { BookFormDTO }
