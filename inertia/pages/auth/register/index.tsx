import { Head, router } from '@inertiajs/react'
import MainContainer from '../../../components/custom/main_container'
import Title from '~/components/custom/title'
import RegisterForm from './components/register_form'

export default function Register() {
  return (
    <>
      <Head title="Registrar-se" />

      <MainContainer>
        <Title>Registrar-se</Title>
        <RegisterForm />
        <div className="text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <a
            onClick={(e) => router.visit('/auth/login')}
            className="hover:text-primary underline underline-offset-4 cursor-pointer"
          >
            Fazer login
          </a>
        </div>
      </MainContainer>
    </>
  )
}
