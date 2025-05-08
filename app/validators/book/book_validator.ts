import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { vineResolver } from '@hookform/resolvers/vine'

// Schema de validação
const bookFormSchema = vine.object({
  title: vine.string().minLength(3).maxLength(255),
  edition: vine.string().minLength(3).maxLength(255),
  releaseDate: vine.date().optional(),
  publisherId: vine.number(),
  authorIds: vine.array(vine.number()),
  errors: vine.array(vine.string()).optional(),
})

// Mensagens padrão
const bookFormSchemaMessages = {
  minLength: 'O campo {{ field }} deve ter pelo menos {{ min }} caracteres.',
  maxLength: 'O campo {{ field }} deve ter no máximo {{ max }} caracteres.',
  date: 'O campo {{ field }} deve conter um valor de data e hora válido.',
  exists: 'O valor informado para {{ field }} não existe.',
}

// Nomes dos campos para mensagens
const bookFormSchemaMessagesField = {
  title: 'Titulo',
  edition: 'Edição',
  releaseDate: 'Data de Lançamento',
  publisherId: 'Editora',
  author: 'Autores',
}

// Valores padrão para o formulário
const bookFormDefaultValues = {
  title: '',
  edition: '',
  releaseDate: undefined,
  publisherId: 0,
  author: [],
  errors: [],
}

// Compila o validador e define o provider de mensagens
const bookFormSchemaValidator = vine.compile(bookFormSchema)

bookFormSchemaValidator.messagesProvider = new SimpleMessagesProvider(
  bookFormSchemaMessages,
  bookFormSchemaMessagesField
)

// Tipagem inferida
type BookFormSchema = Infer<typeof bookFormSchema>

// Resolver do hook-form com vine
const vineBookFormResolver = vineResolver<BookFormSchema, unknown, BookFormSchema>(
  bookFormSchemaValidator
)

export { bookFormSchema, bookFormDefaultValues, bookFormSchemaValidator, vineBookFormResolver }
export type { BookFormSchema }
