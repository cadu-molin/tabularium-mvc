import * as React from 'react'
import { Check, ChevronsUpDown, Loader2, Search, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Badge } from '~/components/ui/badge'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { AuthorDTO } from '#dto/author/author_dto'

// Simulação de API para buscar autores
const fetchAuthors = async (searchTerm: string, authors?: AuthorDTO[]): Promise<AuthorDTO[]> => {
  console.log('Buscando autores com termo:', searchTerm)

  // Filtra os resultados com base no termo de pesquisa
  if (!searchTerm) return authors || []

  if (!authors) return []

  const filtered = authors.filter((author) =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  console.log('Resultados filtrados:', filtered)
  return filtered
}

interface AuthorsMultiSelectProps {
  value: number[]
  onChange: (value: number[]) => void
  name?: string
  label?: string
  description?: string
  required?: boolean
  disabled?: boolean
  error?: string
  form?: any // Para integração com react-hook-form
  authorListAll?: AuthorDTO[]
}

// Componente de botão com ref encaminhado
const ForwardedButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>((props, ref) => <Button ref={ref} {...props} />)
ForwardedButton.displayName = 'ForwardedButton'

export const AuthorsMultiSelect = React.forwardRef<HTMLButtonElement, AuthorsMultiSelectProps>(
  (
    {
      value = [],
      onChange,
      name = 'authorsId',
      label = 'Autores',
      description,
      required = false,
      disabled = false,
      error,
      form,
      authorListAll,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    // Busca autores com base no termo de pesquisa
    const { data: authors = [], isLoading } = useQuery({
      queryKey: ['authors', searchTerm],
      queryFn: () => fetchAuthors(searchTerm, authorListAll),
      enabled: open,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutos
    })
    AuthorsMultiSelect.displayName = 'AuthorsMultiSelect'
    // Deriva os autores selecionados a partir dos dados já carregados
    const selectedAuthors = React.useMemo(() => {
      // Se authors não tem todos os autores, pode ser necessário buscar todos
      // Mas para evitar loop, só filtra dos authors disponíveis
      if (!value || value.length === 0) return []
      // Se authors não contém todos, pode-se considerar uma prop extra futuramente
      return authors.filter((author: AuthorDTO) => value.includes(author.id))
    }, [value, authors])

    // Função para lidar com a mudança no termo de pesquisa
    const handleSearchChange = React.useCallback((value: string) => {
      console.log('Termo de pesquisa alterado para:', value)
      setSearchTerm(value)
    }, [])

    // Função para selecionar/deselecionar um autor
    const toggleAuthor = React.useCallback(
      (authorId: number) => {
        const currentValue = [...value]
        const index = currentValue.indexOf(authorId)

        if (index === -1) {
          // Adicionar autor
          onChange([...currentValue, authorId])
        } else {
          // Remover autor
          currentValue.splice(index, 1)
          onChange(currentValue)
        }
      },
      [value, onChange]
    )

    // Função para remover um autor
    const removeAuthor = React.useCallback(
      (authorId: number) => {
        const currentValue = [...value]
        const index = currentValue.indexOf(authorId)

        if (index !== -1) {
          currentValue.splice(index, 1)
          onChange(currentValue)
        }
      },
      [value, onChange]
    )

    // Se estiver usando com react-hook-form
    if (form) {
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
              </FormLabel>

              {/* Exibir autores selecionados */}
              {selectedAuthors.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedAuthors.map((author) => {
                    const valueArray = Array.isArray(field.value) ? field.value : []
                    return (
                      <Badge key={author.id} variant="secondary" className="text-xs">
                        {author.name}
                        <button
                          type="button"
                          className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onClick={() => {
                            const newValue = valueArray.filter((id: number) => id !== author.id)
                            field.onChange(newValue)
                          }}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remover {author.name}</span>
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              )}

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <ForwardedButton
                    ref={ref}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      'w-full justify-between',
                      !field.value?.length && 'text-muted-foreground'
                    )}
                    disabled={disabled}
                    onClick={() => setOpen(true)}
                  >
                    {field.value?.length
                      ? `${field.value.length} autor${field.value.length > 1 ? 'es' : ''} selecionado${
                          field.value.length > 1 ? 's' : ''
                        }`
                      : `Selecione ${label.toLowerCase()}`}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </ForwardedButton>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command shouldFilter={false}>
                    <div className="flex items-center border-b px-3">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <CommandInput
                        placeholder={`Buscar ${label.toLowerCase()}...`}
                        className="h-9 flex-1 border-0 outline-none focus:ring-0"
                        value={searchTerm}
                        onValueChange={handleSearchChange}
                      />
                    </div>
                    <CommandList>
                      {isLoading ? (
                        <div className="py-6 text-center text-sm">
                          <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                          <p>Buscando autores...</p>
                        </div>
                      ) : (
                        <>
                          <CommandEmpty>
                            <div className="py-6 text-center text-sm">
                              <p>Nenhum autor encontrado.</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Tente outro termo de pesquisa.
                              </p>
                            </div>
                          </CommandEmpty>
                          <CommandGroup>
                            {authors.map((author) => (
                              <CommandItem
                                key={author.id}
                                value={String(author.id)}
                                onSelect={() => {
                                  const newValue = [
                                    ...(Array.isArray(field.value) ? field.value : []),
                                  ]
                                  const index = newValue.indexOf(author.id)

                                  if (index === -1) {
                                    newValue.push(author.id)
                                  } else {
                                    newValue.splice(index, 1)
                                  }

                                  field.onChange(newValue)
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{author.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    ID: {author.id}
                                  </span>
                                </div>
                                <Check
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    field.value?.includes(author.id) ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
      )
    }

    // Versão standalone (sem react-hook-form)
    return (
      <div className="flex flex-col space-y-1.5">
        <div className="font-medium text-sm">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </div>

        {/* Exibir autores selecionados */}
        {selectedAuthors.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {selectedAuthors.map((author) => (
              <Badge key={author.id} variant="secondary" className="text-xs">
                {author.name}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => removeAuthor(author.id)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remover {author.name}</span>
                </button>
              </Badge>
            ))}
          </div>
        )}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              ref={ref}
              aria-expanded={open}
              className={cn(
                'w-full justify-between',
                !value?.length && 'text-muted-foreground',
                error && 'border-destructive'
              )}
              disabled={disabled}
              onClick={() => setOpen(true)}
            >
              {value?.length
                ? `${value.length} autor${value.length > 1 ? 'es' : ''} selecionado${value.length > 1 ? 's' : ''}`
                : `Selecione ${label.toLowerCase()}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command shouldFilter={false}>
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput
                  placeholder={`Buscar ${label.toLowerCase()}...`}
                  className="h-9 flex-1 border-0 outline-none focus:ring-0"
                  value={searchTerm}
                  onValueChange={handleSearchChange}
                />
              </div>
              <CommandList>
                {isLoading ? (
                  <div className="py-6 text-center text-sm">
                    <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                    <p>Buscando autores...</p>
                  </div>
                ) : (
                  <>
                    <CommandEmpty>
                      <div className="py-6 text-center text-sm">
                        <p>Nenhum autor encontrado.</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Tente outro termo de pesquisa.
                        </p>
                      </div>
                    </CommandEmpty>
                    <CommandGroup>
                      {authors.map((author) => (
                        <CommandItem
                          key={author.id}
                          value={String(author.id)}
                          onSelect={() => toggleAuthor(author.id)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{author.name}</span>
                            <span className="text-xs text-muted-foreground">ID: {author.id}</span>
                          </div>
                          <Check
                            className={cn(
                              'ml-auto h-4 w-4',
                              value?.includes(author.id) ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      </div>
    )
  }
)
