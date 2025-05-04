import React from 'react'
import { cn } from '~/lib/utils'

export default function Title({ className, children, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1 className={cn(className, 'text-2xl font-bold text-center text-gray-900')} {...props}>
      {children}
    </h1>
  )
}
