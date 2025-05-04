export default function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="w-full max-w-md px-6 py-4 bg-white shadow-md rounded-lg">{children}</div>
    </div>
  )
}
