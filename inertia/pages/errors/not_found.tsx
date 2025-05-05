import { router } from '@inertiajs/react'
import MainContainer from '~/components/custom/main_container'
import Title from '~/components/custom/title'

export default function NotFound() {
  return (
    <>
      <MainContainer>
        <div className="flex flex-col items-center justify-center ">
          <Title>Página não encontrada</Title>
          <span>
            Voltar para a{' '}
            <a
              onClick={(e) => router.visit('/')}
              className="hover:text-primary underline underline-offset-4 cursor-pointer"
            >
              Página inicial
            </a>
          </span>
        </div>
      </MainContainer>
    </>
  )
}
