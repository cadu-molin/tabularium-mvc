import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { vineResolver } from '@hookform/resolvers/vine'

const reviewFormSchema = vine.object({
  review: vine.string().minLength(3),
  rating: vine.number().min(1).max(5),
})

const reviewFormSchemaMessages = {
  required: 'O campo {{ field }} é obrigatório.',
  minLength: 'O campo {{ field }} deve ter pelo menos {{ min }} caracteres.',
  min: 'A nota mínima é {{ min }}.',
  max: 'A nota máxima é {{ max }}.',
}

const reviewFormSchemaMessagesField = {
  review: 'Resenha',
  rating: 'Nota',
}

const reviewFormDefaultValues = {
  review: '',
  rating: 0,
}

const reviewFormSchemaValidator = vine.compile(reviewFormSchema)
reviewFormSchemaValidator.messagesProvider = new SimpleMessagesProvider(
  reviewFormSchemaMessages,
  reviewFormSchemaMessagesField
)

type ReviewFormSchema = Infer<typeof reviewFormSchema>

const vineReviewFormResolver = vineResolver<ReviewFormSchema, unknown, ReviewFormSchema>(
  reviewFormSchemaValidator
)

export {
  reviewFormSchema,
  reviewFormSchemaValidator,
  vineReviewFormResolver,
  reviewFormDefaultValues,
}
export type { ReviewFormSchema }
