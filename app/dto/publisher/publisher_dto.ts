import Publisher from '#models/publisher'

type PublisherDTO = {
  id: number
  name: string
  createdAt: string
  updatedAt: string | null
}

function createPublisherDTOFromModel(publisher: Publisher): PublisherDTO {
  return {
    id: publisher.id,
    name: publisher.name,
    createdAt: publisher.createdAt.toString() || '',
    updatedAt: publisher.updatedAt?.toString() || '',
  }
}

export type { PublisherDTO }

export { createPublisherDTOFromModel }
