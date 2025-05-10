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

// Tipo para representar um autor
interface Author {
  id: number
  name: string
}

// Simulação de API para buscar autores
const fetchAuthors = async (searchTerm: string): Promise<Author[]> => {
  console.log('Buscando autores com termo:', searchTerm)

  // Em um ambiente real, isso seria uma chamada de API
  // Simulando um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Dados de exemplo
  const authors: Author[] = [
    { id: 1, name: 'J.K. Rowling' },
    { id: 2, name: 'George R.R. Martin' },
    { id: 3, name: 'J.R.R. Tolkien' },
    { id: 4, name: 'Stephen King' },
    { id: 5, name: 'Agatha Christie' },
    { id: 6, name: 'Machado de Assis' },
    { id: 7, name: 'Clarice Lispector' },
    { id: 8, name: 'Carlos Drummond de Andrade' },
    { id: 9, name: 'Paulo Coelho' },
    { id: 10, name: 'Graciliano Ramos' },
    { id: 11, name: 'José Saramago' },
    { id: 12, name: 'Gabriel García Márquez' },
  ]

  // Filtra os resultados com base no termo de pesquisa
  if (!searchTerm) return authors

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
}

// Componente de botão com ref encaminhado
const ForwardedButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>((props, ref) => <Button ref={ref} {...props} />)
ForwardedButton.displayName = 'ForwardedButton'

export function AuthorsMultiSelect({
  value = [],
  onChange,
  name = 'authorsId',
  label = 'Autores',
  description,
  required = false,
  disabled = false,
  error,
  form,
}: AuthorsMultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedAuthors, setSelectedAuthors] = React.useState<Author[]>([])

  // Busca autores com base no termo de pesquisa
  const { data: authors = [], isLoading } = useQuery({
    queryKey: ['authors', searchTerm],
    queryFn: () => fetchAuthors(searchTerm),
    enabled: open,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })

  // Busca detalhes dos autores selecionados quando o valor muda
  React.useEffect(() => {
    const fetchAuthorDetails = async () => {
      if (value && value.length > 0) {
        const allAuthors = await fetchAuthors('')
        const selected = allAuthors.filter((author) => value.includes(author.id))
        setSelectedAuthors(selected)
      } else {
        setSelectedAuthors([])
      }
    }

    fetchAuthorDetails()
  }, [value])

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
                {selectedAuthors.map((author) => (
                  <Badge key={author.id} variant="secondary" className="text-xs">
                    {author.name}
                    <button
                      type="button"
                      className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={() => {
                        const newValue = field.value.filter((id: number) => id !== author.id)
                        field.onChange(newValue)
                      }}
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
                <FormControl>
                  <ForwardedButton
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
                </FormControl>
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
                                const newValue = [...field.value]
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
