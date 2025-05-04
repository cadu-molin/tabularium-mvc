import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { vineResolver } from '@hookform/resolvers/vine'

const registerFormSchema = vine.object({
  fullName: vine.string().minLength(3).maxLength(255),
  login: vine.string().minLength(3).maxLength(255),
  password: vine
    .string()
    .minLength(8)
    .maxLength(255)
    .confirmed({ confirmationField: 'password_confirmation' }),
  password_confirmation: vine.string().sameAs('password'),
})

const registerFormSchemaMessages = {
  minLength: 'O campo {{ field }}  deve ter pelo menos {{ min }} caracteres',
  maxLength: 'O campo {{ field }}  deve ter no máximo {{ max }} caracteres',
  confirmed: 'As senhas não conferem',
  sameAs: 'As senhas não conferem',
}

const registerFormSchemaMessagesField = {
  fullName: 'Nome completo',
  login: 'Login',
  password: 'Senha',
  password_confirmation: 'Confirmação de senha',
}

const registerFormDefaultValues = {
  fullName: '',
  login: '',
  password: '',
  password_confirmation: '',
}

const registerFormSchemaValidator = vine.compile(registerFormSchema)

registerFormSchemaValidator.messagesProvider = new SimpleMessagesProvider(
  registerFormSchemaMessages,
  registerFormSchemaMessagesField
)

type RegisterFormSchema = Infer<typeof registerFormSchema>

const vineRegisterFormResolver = vineResolver<RegisterFormSchema, unknown, RegisterFormSchema>(
  registerFormSchemaValidator
)

export {
  registerFormSchema,
  registerFormDefaultValues,
  registerFormSchemaValidator,
  vineRegisterFormResolver,
}
export type { RegisterFormSchema }
