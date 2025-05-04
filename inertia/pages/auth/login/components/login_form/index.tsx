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

import { vineLoginFormResolver, loginFormDefaultValues } from './setup_vine'
import type { LoginFormSchema } from './setup_vine'
import { Button } from '~/components/ui/button'
import { router, usePage } from '@inertiajs/react'
import { SharedProps } from '@adonisjs/inertia/types'
import { Result } from '#types/result'
import { RequestError } from '#dto/request_error'
import { LoginFormDTO } from '#dto/auth/login_form_dto'

export default function LoginForm() {
  const { env } = usePage<SharedProps>().props

  const loginForm = useForm<LoginFormSchema>({
    resolver: vineLoginFormResolver,
    defaultValues: loginFormDefaultValues,
  })

  async function handleSubmit(submitForm: LoginFormSchema) {
    try {
      const responseRegister = await fetch(`${env.APP_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitForm),
      })

      const responseData: Result<LoginFormDTO, RequestError> = await responseRegister.json()

      if (!responseData.success) {
        console.log('Error handleSubmit:', responseData.error.message)
        loginForm.setError('errors', {
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
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          name="login"
          control={loginForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={loginForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Login
        </Button>

        <FormField
          name="errors"
          control={loginForm.control}
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
