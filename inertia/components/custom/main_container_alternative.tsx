import { cn } from '~/lib/utils'

export default function MainContainerAlternative({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return <div className=" px-6 py-4 bg-white  ">{children}</div>
}
