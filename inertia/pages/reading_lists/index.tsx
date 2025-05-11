import { Head, router, usePage } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import MainContainerAlternative from '~/components/custom/main_container_alternative'
import Title from '~/components/custom/title'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import MainLayout from '~/layouts/main_layout'
import { PageProps } from './types'

export default function ReadingListIndex() {
  const { lists } = usePage<PageProps>().props

  return (
    <>
      <Head title="Minhas Listas de Leitura" />
      <MainContainerAlternative>
        <Title>Minhas Listas</Title>
        <div className="flex justify-center">
          <div className="w-[600px] space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => router.visit('/reading-lists/create')}>Nova Lista</Button>
            </div>
            {lists?.map((list) => (
              <Card key={list.id} onClick={() => router.visit(`/reading-lists/${list.id}`)} className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardHeader>
                  <CardTitle>{list.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{list.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </MainContainerAlternative>
    </>
  )
}

ReadingListIndex.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
