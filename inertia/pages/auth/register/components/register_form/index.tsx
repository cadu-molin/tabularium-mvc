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

import { vineRegisterFormResolver, registerFormDefaultValues } from './setup_vine'
import type { RegisterFormSchema } from './setup_vine'
import { Button } from '~/components/ui/button'
import { router } from '@inertiajs/react'

export default function RegisterForm() {
  const registerForm = useForm<RegisterFormSchema>({
    resolver: vineRegisterFormResolver,
    defaultValues: registerFormDefaultValues,
  })

  function handleSubmit(submitForm: RegisterFormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault()
    try {
      router.post('/auth/register', submitForm, {
        onError: (error) => console.error('Error:', error),
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          name="fullName"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="login"
          control={registerForm.control}
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
          control={registerForm.control}
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
        <FormField
          name="password_confirmation"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmação de senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Registrar-se
        </Button>
      </form>
    </Form>
  )
}
