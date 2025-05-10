import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'

import { vineBookFormResolver, bookFormDefaultValues } from './setup_vine'
import type { BookFormSchema } from './setup_vine'
import { Button } from '~/components/ui/button'
import { usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { Result } from '#types/result'
import { RequestError } from '#dto/request_error'
import { BookFormDTO } from '#dto/book/book_form_dto'
import { PublisherSearch } from '../publisher_search'
import { PublisherDTO } from '#dto/publisher/publisher_dto'
import { AuthorsMultiSelect } from '../author_multi_select'
import { AuthorDTO } from '#dto/author/author_dto'

interface BookFormProps {
  publishers: PublisherDTO[]
  authors: AuthorDTO[]
}

export default function BookForm({ publishers, authors }: BookFormProps) {
  const { env } = usePage<SharedProps>().props

  const bookForm = useForm<BookFormSchema>({
    resolver: vineBookFormResolver,
    defaultValues: bookFormDefaultValues,
  })

  async function handleSubmit(submitForm: BookFormSchema) {
    try {
      console.log(submitForm)

      const responseRegister = await fetch(`${env.APP_URL}/book/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitForm),
      })

      const responseData: Result<BookFormDTO, RequestError> = await responseRegister.json()

      if (!responseData.success) {
        console.log('Error handleSubmit:', responseData.error.message)
        bookForm.setError('errors', {
          type: 'custom',
          message: responseData.error.message,
        })
        return
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Form {...bookForm}>
      <form onSubmit={bookForm.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          name="title"
          control={bookForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="edition"
          control={bookForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edição</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="releaseDate"
          control={bookForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Publicação</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="publisherId"
          control={bookForm.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PublisherSearch
                  value={field.value | 0}
                  onChange={field.onChange}
                  required
                  description="Selecione a editora do livro."
                  form={bookForm}
                  publishersListAll={publishers}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="authorsId"
          control={bookForm.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AuthorsMultiSelect
                  value={field.value}
                  onChange={field.onChange}
                  required
                  description="Selecione um ou mais autores do livro."
                  form={bookForm}
                  authorListAll={authors}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Salvar
        </Button>

        <FormField
          name="errors"
          control={bookForm.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
