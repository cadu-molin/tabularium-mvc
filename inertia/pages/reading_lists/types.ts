import { PageProps as InertiaPageProps } from '@inertiajs/core'

export interface ReadingList {
  id: number
  name: string
  description?: string
}

export interface ReadingListWithBooks extends ReadingList {
  books: { id: number; title: string; author: string }[]
}

export interface PageProps extends InertiaPageProps {
  lists?: ReadingList[]
  readingList?: ReadingList | ReadingListWithBooks
} 