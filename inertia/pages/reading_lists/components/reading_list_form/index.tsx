import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { ReadingList } from '../../types'

interface ReadingListFormProps {
  initialData?: Partial<ReadingList>
  onSubmit: (data: { name: string; description: string }) => void
  submitLabel: string
}

export default function ReadingListForm({ initialData, onSubmit, submitLabel }: ReadingListFormProps) {
  const { data, setData, processing, errors } = useForm({
    name: initialData?.name || '',
    description: initialData?.description || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
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
            {submitLabel}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
} 