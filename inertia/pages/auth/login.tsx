import { Head } from '@inertiajs/react'
import { Button } from '~/components/ui/button'

export default function Home() {
  return (
    <>
      <Head title="Registrar-se" />

      <div className="">
        teste
        <input type="text" name="login" id="login" />
      </div>
      <Button>Click me</Button>
    </>
  )
}
