import { DateTime } from 'luxon'

type BookFormDTO = {
  title: string
  edition: string
  releaseDate: DateTime | null
  publisherId: number
  authorIds: number[]
}

export type { BookFormDTO }
