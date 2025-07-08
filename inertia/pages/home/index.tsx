import { Head, router } from '@inertiajs/react'
import MainContainer from '~/components/custom/main_container'
import Title from '~/components/custom/title'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'

export default function Home({ recomendacoes }: { recomendacoes?: any[] }) {
  return (
    <>
      <Head title="Homepage" />
      <MainContainer>
        <Title className="m-4">Bem-vindo ao Tabularium</Title>
        <div className="flex flex-col gap-4">
          <Button onClick={(e) => router.visit('auth/login')}>Login</Button>
          <Button onClick={(e) => router.visit('auth/register')}>Registrar-se</Button>
        </div>
        {recomendacoes && recomendacoes.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-2">Recomendações de Livros</h2>
            <ul>
              {recomendacoes.map((livro, idx) => (
                <li key={idx} className="mb-1">{livro.titulo} - {livro.autor}</li>
              ))}
            </ul>
          </div>
        )}
      </MainContainer>
    </>
  )
}
