import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { vineResolver } from '@hookform/resolvers/vine'

const bookFormSchema = vine.object({
  title: vine.string().minLength(3).maxLength(255),
  edition: vine.string().minLength(3).maxLength(255),
  releaseDate: vine.date(),
  publisherId: vine.number(),
  author: vine.array(vine.number()),
  errors: vine.array(vine.string()).optional(),
})

const bookFormSchemaMessages = {
  minLength: 'O campo {{ field }}  deve ter pelo menos {{ min }} caracteres',
  maxLength: 'O campo {{ field }}  deve ter no máximo {{ max }} caracteres',
}

const bookFormSchemaMessagesField = {
  title: "Titulo",
  edition: "Edição",
  releaseDate: "Data de Lançamento",
  publisherId: "Editora",
  author: "Autores",
}

const bookFormDefaultValues = {
  title: '',
  edition: '',
  releaseDate: new Date(),
  publisherId: 0,
  author: [],
  errors: [],
}

const bookFormSchemaValidator = vine.compile(bookFormSchema)

bookFormSchemaValidator.messagesProvider = new SimpleMessagesProvider(
  bookFormSchemaMessages,
  bookFormSchemaMessagesField
)

type BookFormSchema = Infer<typeof bookFormSchema>

const vineBookFormResolver = vineResolver<BookFormSchema, unknown, BookFormSchema>(
  bookFormSchemaValidator
)

export { bookFormSchema, bookFormDefaultValues, bookFormSchemaValidator, vineBookFormResolver }
export type { BookFormSchema }
