import User from '#models/user'
import { SharedProps } from '@adonisjs/inertia/types'
import { Head, usePage } from '@inertiajs/react'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
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
import MainLayout from '~/layouts/main_layout'

export default function Profile() {
  const { user } = usePage<SharedProps>().props

  const currentUser = user as User

  const [login, setLogin] = useState(currentUser.login)
  const [fullName, setFullName] = useState(currentUser.fullName)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

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
                  <Input
                    id="fullName"
                    defaultValue={fullName || ''}
                    onChange={(e) => {
                      setFullName(e.target.value)
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login">Login</Label>
                  <Input
                    id="login"
                    defaultValue={login}
                    onChange={(e) => {
                      setLogin(e.target.value)
                    }}
                  />
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
                  <Input
                    id="current"
                    type="password"
                    onChange={(e) => {
                      setCurrentPassword(e.target.value)
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">Senha nova</Label>
                  <Input
                    id="new"
                    type="password"
                    onChange={(e) => {
                      setNewPassword(e.target.value)
                    }}
                  />
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

Profile.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>
