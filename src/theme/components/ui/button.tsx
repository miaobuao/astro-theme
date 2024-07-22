import type { ClassValue } from 'clsx'
import { Component, toChildArray } from 'preact'
import { cn } from '@/theme/lib/utils'

export function LinkButton(props: {
  className?: ClassValue
  children: Component
  href?: string
}) {
  return (
    <a class={cn('hover:underline underline-offset-2', props.className)} href={props.href}>
      {toChildArray(props.children)}
    </a>
  )
}
