import { Book, BookOpen, Bookmark, User, UserCircle, LogOut } from 'lucide-react'

import { cn } from '~/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation_menu'
import React from 'react'
import { router } from '@inertiajs/react'

export function MainMenuBar() {
  return (
    <div className="flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          {/* Profile Section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-3 p-4">
                <ListItem
                  onClick={(e) => {
                    e.preventDefault()
                    router.visit('/profile')
                  }}
                  title="Meu Perfil"
                  icon={<UserCircle className="mr-2 h-4 w-4" />}
                >
                  Ver e editar suas informações de perfil
                </ListItem>
                <ListItem
                  onClick={(e) => {
                    e.preventDefault()
                    router.visit('/profile/reading_lists')
                  }}
                  title="Minhas listas de leitura"
                  icon={<BookOpen className="mr-2 h-4 w-4" />}
                >
                  Ver suas listas de leitura
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Books Section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Book className="mr-2 h-4 w-4" />
              Livros
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-3 p-4">
                <ListItem
                  onClick={(e) => {
                    e.preventDefault()
                    router.visit('/book/list')
                  }}
                  title="Buscar livros"
                  icon={<Book className="mr-2 h-4 w-4" />}
                >
                  Buscar livros
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Reading List Section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Bookmark className="mr-2 h-4 w-4" />
              Listas de Leitura
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-3 p-4">
                <ListItem
                  onClick={(e) => {
                    e.preventDefault()
                    router.visit('/reading-lists')
                  }}
                  title="Buscar por Listas de Leitura"
                  icon={<Bookmark className="mr-2 h-4 w-4" />}
                >
                  Buscar por Listas de Leitura
                </ListItem>
                <ListItem
                  onClick={(e) => {
                    e.preventDefault()
                    router.visit('/profile/reading-list/current')
                  }}
                  title="Lendo atualmente"
                  icon={<BookOpen className="mr-2 h-4 w-4" />}
                >
                  Livros que você está lendo atualmente
                </ListItem>
                <ListItem
                  onClick={(e) => {
                    e.preventDefault()
                    router.visit('/profile/reading-list/completed')
                  }}
                  title="Concluídos"
                  icon={<Book className="mr-2 h-4 w-4" />}
                >
                  Livros que você já leu
                </ListItem>
                <ListItem
                  onClick={(e) => {
                    e.preventDefault()
                    router.visit('/profile/reading-list/wishlist')
                  }}
                  title="Lista de Desejos"
                  icon={<Bookmark className="mr-2 h-4 w-4" />}
                >
                  Livros que você deseja ler no futuro
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Home Link */}
          {/* <NavigationMenuItem> */}
          {/* <NavigationMenuLink */}
          {/* onClick={(e) => { */}
          {/* e.preventDefault() */}
          {/* router.visit('/') */}
          {/* }} */}
          {/* className={navigationMenuTriggerStyle()} */}
          {/* > */}
          {/* <Home className="mr-2 h-4 w-4" /> */}
          {/* Home */}
          {/* </NavigationMenuLink> */}
          {/* </NavigationMenuItem> */}

          {/* Logout */}
          <NavigationMenuItem>
            <NavigationMenuLink
              onClick={(e) => {
                e.preventDefault()
                router.visit('/auth/logout')
              }}
              className={cn('cursor-pointer', navigationMenuTriggerStyle())}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ComponentRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon?: React.ReactNode }
>(({ className, title, children, icon, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink
        onClick={onClick}
        asChild
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
      >
        <div className="text-sm font-medium leading-none flex items-center">
          {icon}
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
