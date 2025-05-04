import { Head } from '@inertiajs/react'
import MainContainer from './components/main_container'
import Title from '~/components/custom/title'
import RegisterForm from './components/register_form'

export default function Register() {
  return (
    <>
      <Head title="Registrar-se" />

      <MainContainer>
        <Title>Registrar-se</Title>
        <RegisterForm />
      </MainContainer>
    </>
  )
}
