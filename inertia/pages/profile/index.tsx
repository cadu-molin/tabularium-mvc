import { SharedProps } from '@adonisjs/inertia/types'
import { Head, usePage } from '@inertiajs/react'
import { Label } from '@radix-ui/react-label'
import MainContainer from '~/components/custom/main_container'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'

export default function Home() {
  const { user } = usePage<SharedProps>().props

  return (
    <>
      <Head title="Perfil" />

      <MainContainer>
        <Tabs defaultValue="profile" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="password">Senha</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>
                  Faça alterações na sua conta aqui. Clique em salvar quando terminar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Nome</Label>
                  <Input id="fullName" defaultValue="Seu nome" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login">Login</Label>
                  <Input id="login" defaultValue="seu.login" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Senha</CardTitle>
                <CardDescription>
                  Altere sua senha aqui. Após salvar, você será desconectado.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Senha atual</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Senha nova</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar senha</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </MainContainer>
    </>
  )
}
