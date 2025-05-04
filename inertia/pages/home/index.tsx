import { Head, router } from '@inertiajs/react'
import MainContainer from '~/components/custom/main_container'
import Title from '~/components/custom/title'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'

export default function Home() {
  return (
    <>
      <Head title="Homepage" />
      <MainContainer>
        <Title className="m-4">Bem-vindo ao Tabularium</Title>
        <div className="flex flex-col gap-4">
          <Button onClick={(e) => router.visit('auth/login')}>Login</Button>
          <Button onClick={(e) => router.visit('auth/register')}>Registrar-se</Button>
        </div>
      </MainContainer>
    </>
  )
}
