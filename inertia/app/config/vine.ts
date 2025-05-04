import vine, { SimpleMessagesProvider } from '@vinejs/vine'

function setupVine() {
  const messages = {
    minLength: 'O {{ field }} campo deve ter pelos menos {{ min }} caracteres',
    maxLength: 'O {{ field }} campo deve ter no máximo {{ max }} caracteres',
  }

  vine.messagesProvider = new SimpleMessagesProvider(messages)
}

export { setupVine }
