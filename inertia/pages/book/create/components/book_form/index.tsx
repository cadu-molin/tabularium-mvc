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
import { useEffect, useState } from 'react'
import { PublisherSearch } from '../publisher_search'

export type Author = {
  id: number
  name: string
}

export default function BookForm() {
  const { env } = usePage<SharedProps>().props

  const bookForm = useForm<BookFormSchema>({
    resolver: vineBookFormResolver,
    defaultValues: bookFormDefaultValues,
  })

  async function handleSubmit(submitForm: BookFormSchema) {
    try {
      const responseRegister = await fetch(`${env.APP_URL}/auth/login`, {
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
                  value={field.value ? String(field.value) : ''}
                  onChange={field.onChange}
                  required
                  description="Selecione a editora do livro."
                  form={bookForm}
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
              <FormLabel>Autores</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ? field.value.join(',') : ''}
                  onChange={(e) => field.onChange(e.target.value.split(',').map(Number))}
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
