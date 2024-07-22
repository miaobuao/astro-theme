import config from '@/consts'

export function formatDatetime(date: Date) {
  return new Intl.DateTimeFormat(
    config.site.locale,
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  ).format(date)
}
