import { Head, usePage } from '@inertiajs/react'

export default function Login() {
  const { user } = usePage().props

  console.log('user', user)

  return (
    <>
      <Head title="Login" />

      <div className="text-lg font-bold underline">home {JSON.stringify(user)} </div>
    </>
  )
}
