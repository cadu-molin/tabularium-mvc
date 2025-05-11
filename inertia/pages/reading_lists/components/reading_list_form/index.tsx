import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { ReadingList } from '../../types'

interface ReadingListFormProps {
  data: { name: string; description: string }
  setData: (field: string, value: string) => void
  submitLabel: string
}

export default function ReadingListForm({ data, setData, submitLabel }: ReadingListFormProps) {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <Card>
        <CardHeader>
          <CardTitle>Informações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          {/* O botão de submit real fica fora deste componente */}
          <span></span>
        </CardFooter>
      </Card>
    </form>
  )
} 