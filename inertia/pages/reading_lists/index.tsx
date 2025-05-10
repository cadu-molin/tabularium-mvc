import { Head, router, usePage } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import Title from '~/components/custom/title'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import MainLayout from '~/layouts/main_layout'

interface PageProps extends InertiaPageProps {
  lists: { id: number; name: string; description?: string }[]
}

export default function ReadingListIndex() {
  const { lists } = usePage<PageProps>().props

  return (
    <>
      <Head title="Minhas Listas de Leitura" />
      <MainContainerAlternative>
        <div className="flex items-center justify-between mb-4">
          <Title>Minhas Listas</Title>
          <Button onClick={() => router.visit('/reading-lists/create')}>Nova Lista</Button>
        </div>

        <div className="grid gap-4">
          {lists.map((list) => (
            <Card key={list.id} onClick={() => router.visit(`/reading-lists/${list.id}`)} className="cursor-pointer">
              <CardHeader>
                <CardTitle>{list.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{list.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </MainContainerAlternative>
    </>
  )
}

ReadingListIndex.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
