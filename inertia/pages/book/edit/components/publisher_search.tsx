import * as React from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
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
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import type { PublisherDTO } from '#dto/publisher/publisher_dto'

// Tipo para representar uma editora

// Simulação de API para buscar editoras
const fetchPublishers = async (
  searchTerm: string,
  publishers?: PublisherDTO[]
): Promise<PublisherDTO[]> => {
  console.log('Buscando editoras com termo:', searchTerm)

  if (!searchTerm) return publishers || []

  if (!publishers) return []

  const filtered = publishers.filter((publisher) =>
    publisher.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  console.log('filtered publishers:', filtered)
  return filtered
}

interface PublisherSearchProps {
  value: number
  onChange: (value: string) => void
  name?: string
  label?: string
  description?: string
  required?: boolean
  disabled?: boolean
  error?: string
  form?: any // Para integração com react-hook-form
  publishersListAll?: PublisherDTO[]
}

// Componente de botão com ref encaminhado
const ForwardedButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => <Button ref={ref} className={className} {...props} />)
ForwardedButton.displayName = 'ForwardedButton'

export const PublisherSearch = React.forwardRef<HTMLButtonElement, PublisherSearchProps>(
  (
    {
      value,
      onChange,
      name = 'publisherId',
      label = 'Editora',
      description,
      required = false,
      disabled = false,
      error,
      form,
      publishersListAll,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selectedPublisher, setSelectedPublisher] = React.useState<PublisherDTO | null>(null)

    // Busca editoras com base no termo de pesquisa
    const { data: publishers = [], isLoading } = useQuery({
      queryKey: ['publishers', searchTerm],
      queryFn: () => fetchPublishers(searchTerm, publishersListAll),
      enabled: open,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    })

    // Busca detalhes da editora selecionada quando o valor muda
    React.useEffect(() => {
      const fetchPublisherDetails = async () => {
        if (value) {
          const publisher = publishers?.find((p) => p.id === value)
          if (publisher) {
            setSelectedPublisher(publisher)
          } else {
            // Buscar detalhes da editora pelo ID
            const allPublishers = await fetchPublishers('', publishersListAll)
            const publisher = allPublishers.find((p) => p.id === value)
            if (publisher) {
              setSelectedPublisher(publisher)
            }
          }
        } else {
          setSelectedPublisher(null)
        }
      }

      fetchPublisherDetails()
    }, [value])

    const handleSearchChange = React.useCallback((value: string) => {
      console.log('Termo de pesquisa alterado para:', value)
      setSearchTerm(value)
    }, [])

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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                      disabled={disabled}
                    >
                      {selectedPublisher
                        ? selectedPublisher.name
                        : `Selecione uma ${label.toLowerCase()}`}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <PublisherCommandList
                    searchTerm={searchTerm}
                    setSearchTerm={handleSearchChange}
                    publishers={publishers || []}
                    isLoading={isLoading}
                    selectedValue={field.value}
                    onSelect={(publisherId) => {
                      field.onChange(publisherId)
                      setOpen(false)
                    }}
                  />
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
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              type="button"
              id={name}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                'w-full justify-between',
                !value && 'text-muted-foreground',
                error && 'border-destructive'
              )}
              disabled={disabled}
              onClick={() => setOpen(true)}
            >
              {selectedPublisher ? selectedPublisher.name : `Selecione uma ${label.toLowerCase()}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <PublisherCommandList
              searchTerm={searchTerm}
              setSearchTerm={handleSearchChange}
              publishers={publishers}
              isLoading={isLoading}
              selectedValue={value}
              onSelect={(publisherId) => {
                onChange(publisherId)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {error && <p className="text-sm font-medium text-destructive">{error}</p>}

        {/* Input oculto para armazenar o ID da editora */}
        <Input type="hidden" name={name} value={value} readOnly />
      </div>
    )
  }
)

PublisherSearch.displayName = 'PublisherSearch'

// Componente interno para a lista de resultados
function PublisherCommandList({
  searchTerm,
  setSearchTerm,
  publishers,
  isLoading,
  selectedValue,
  onSelect,
}: {
  searchTerm: string
  setSearchTerm: (value: string) => void
  publishers: PublisherDTO[]
  isLoading: boolean
  selectedValue: number
  onSelect: (value: string) => void
}) {
  return (
    <Command shouldFilter={false}>
      <div className="flex items-center border-b px-3">
        <CommandInput
          placeholder="Buscar editora..."
          className="h-9 flex-1 border-0 outline-none focus:ring-0"
          value={searchTerm}
          onValueChange={(e) => setSearchTerm(e)}
        />
      </div>
      <CommandList>
        {isLoading ? (
          <div className="py-6 text-center text-sm">
            <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
            <p>Buscando editoras...</p>
          </div>
        ) : (
          <>
            <CommandEmpty>
              <div className="py-6 text-center text-sm">
                <p>Nenhuma editora encontrada.</p>
                <p className="text-xs text-muted-foreground mt-1">Tente outro termo de pesquisa.</p>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {publishers.map((publisher) => (
                <CommandItem
                  key={publisher.id}
                  value={String(publisher.id)}
                  onSelect={() => onSelect(String(publisher.id))}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{publisher.name}</span>
                    <span className="text-xs text-muted-foreground">ID: {publisher.id}</span>
                  </div>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      publisher.id === selectedValue ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  )
}
