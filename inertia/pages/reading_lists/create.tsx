import { Head, useForm } from '@inertiajs/react'
import MainContainer from '~/components/custom/main_container'
import Title from '~/components/custom/title'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function CreateReadingList() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/reading-lists')
  }

  return (
    <>
      <Head title="Nova Lista de Leitura" />
      <MainContainer>
        <Title>Criar Nova Lista</Title>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={processing}>
                Criar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </MainContainer>
    </>
  )
}
