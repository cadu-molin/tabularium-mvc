type BookFormDTO = {
    title: string
    edition: string
    releaseDate: Date | null
    publisherId: number
    author: object[]
  }

  export type { BookFormDTO }
