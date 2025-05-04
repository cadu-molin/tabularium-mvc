import { Head } from '@inertiajs/react'
import MainContainer from '../../../components/custom/main_container'
import Title from '~/components/custom/title'
import LoginForm from './components/login_form'

export default function Register() {
  return (
    <>
      <Head title="Login" />

      <MainContainer>
        <Title>Login</Title>
        <LoginForm />
      </MainContainer>
    </>
  )
}
