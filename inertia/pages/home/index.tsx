import { Head, usePage } from '@inertiajs/react'

export default function Home() {
  const { user } = usePage().props

  console.log('user', user)

  return (
    <>
      <Head title="Homepage" />

      <div className="text-lg font-bold underline">home {JSON.stringify(user)} </div>
    </>
  )
}
