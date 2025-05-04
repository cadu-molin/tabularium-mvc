import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { vineResolver } from '@hookform/resolvers/vine'

const loginFormSchema = vine.object({
  login: vine.string().minLength(3).maxLength(255),
  password: vine.string().minLength(8).maxLength(255),
  errors: vine.array(vine.string()).optional(),
})

const loginFormSchemaMessages = {
  minLength: 'O campo {{ field }}  deve ter pelo menos {{ min }} caracteres',
  maxLength: 'O campo {{ field }}  deve ter no máximo {{ max }} caracteres',
}

const loginFormSchemaMessagesField = {
  login: 'Login',
  password: 'Senha',
}

const loginFormDefaultValues = {
  login: '',
  password: '',
  errors: [],
}

const loginFormSchemaValidator = vine.compile(loginFormSchema)

loginFormSchemaValidator.messagesProvider = new SimpleMessagesProvider(
  loginFormSchemaMessages,
  loginFormSchemaMessagesField
)

type LoginFormSchema = Infer<typeof loginFormSchema>

const vineLoginFormResolver = vineResolver<LoginFormSchema, unknown, LoginFormSchema>(
  loginFormSchemaValidator
)

export { loginFormSchema, loginFormDefaultValues, loginFormSchemaValidator, vineLoginFormResolver }
export type { LoginFormSchema }
