import { cn } from '~/lib/utils'

export default function MainContainer({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100',
        className
      )}
    >
      <div className="w-full max-w-md px-6 py-4 bg-white shadow-md rounded-lg">{children}</div>
    </div>
  )
}
