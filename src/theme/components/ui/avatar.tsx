import { useCallback, useState } from 'preact/hooks'
import { cn } from '@/theme/lib/utils'

export function Avatar(props: {
  className?: string
  url: string
  alt?: string
}) {
  const { className, url, alt } = props
  const [showAlt, setShowAlt] = useState(true)
  const onError = useCallback(() => {
    setShowAlt(true)
  }, [])
  const onSucc = useCallback(() => {
    setShowAlt(false)
  }, [])
  return (
    <div class="relative select-none">
      <div class={cn('avatar placeholder', showAlt || 'invisible')}>
        <div class={className}>
          {alt}
        </div>
      </div>
      <div class={cn('avatar absolute top-0 left-0 invisible', showAlt || 'visible')}>
        <div class={className}>
          <img src={url} alt={alt} loading="lazy" onError={onError} onLoad={onSucc} />
        </div>
      </div>
    </div>
  )
}
