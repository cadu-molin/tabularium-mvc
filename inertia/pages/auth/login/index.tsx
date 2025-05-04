import { Head, router } from '@inertiajs/react'
import MainContainer from '../../../components/custom/main_container'
import Title from '~/components/custom/title'
import LoginForm from './components/login_form'
import { Button } from '~/components/ui/button'

export default function Register() {
  return (
    <>
      <Head title="Login" />

      <MainContainer>
        <Title>Login</Title>
        <LoginForm />
        <div className="text-sm text-muted-foreground">
          Não tem uma conta?{' '}
          <a
            onClick={(e) => router.visit('/auth/register')}
            className="hover:text-primary underline underline-offset-4 cursor-pointer"
          >
            Registrar-se
          </a>
        </div>
      </MainContainer>
    </>
  )
}
