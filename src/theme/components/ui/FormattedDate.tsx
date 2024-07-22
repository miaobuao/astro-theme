import config from '@/consts'

export function FormattedDate({ date }: { date: Date }) {
  return (
    <time dateTime={date.toISOString()}>
      {date.toLocaleDateString(config.site.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })}
    </time>
  )
}
