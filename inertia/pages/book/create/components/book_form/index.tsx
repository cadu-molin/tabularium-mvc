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
import { router, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { Result } from '#types/result'
import { RequestError } from '#dto/request_error'
import { BookFormDTO } from '#dto/book/book_form_dto'
import DataTableDemo from '../teste/page'
import { useEffect, useState } from 'react'

export type Author = {
  id: number
  name: string
}

export default function BookForm() {
  const [selectedAuthors, setSelectedAuthors] = useState<number[]>([])
  const { env } = usePage<SharedProps>().props
  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    fetch(`${env.APP_URL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.error('Erro ao buscar autores:', err))
  }, [])

  const bookForm = useForm<BookFormSchema>({
    resolver: vineBookFormResolver,
    defaultValues: bookFormDefaultValues,
  })

  async function handleSubmit(submitForm: BookFormSchema) {
    try {

      submitForm.authorIds = selectedAuthors

      const responseRegister = await fetch(`${env.APP_URL}/book`, {
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
      router.get('/profile')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...bookForm}>
        <form onSubmit={bookForm.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            name="title"
            control={bookForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
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
                <FormLabel>Editora</FormLabel>
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
                <FormLabel>Data de Lançamento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} />
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
                <FormLabel>Código da Editora</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            name="author"
            control={bookForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autores</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={Array.isArray(field.value) ? field.value.join(', ') : field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            name="authorIds"
            control={bookForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código da Editora</FormLabel>
                <FormControl>
                  <DataTableDemo authors={authors} authorsSelected={field.value} onSelectionChange={setSelectedAuthors} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Gravar
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
    </div>
  )
}
