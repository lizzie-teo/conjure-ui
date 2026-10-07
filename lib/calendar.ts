// Date helpers shared by the month and year calendars. Dates travel as ISO `YYYY-MM-DD` strings
// and are read as *local* dates, so a day never shifts across a time-zone boundary.

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d ?? 1)
}

export function toISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Whole days from `a` to `b` (b − a). */
export function daysBetween(a: string, b: string): number {
  return Math.round((parseISODate(b).getTime() - parseISODate(a).getTime()) / 86_400_000)
}

/**
 * A month as weeks of seven cells. Cells outside the month are `null`, so every week lines up
 * under the weekday header. `weekStartsOn`: 0 = Sunday, 1 = Monday.
 */
export function monthWeeks(month: string, weekStartsOn: 0 | 1 = 1): (string | null)[][] {
  const first = parseISODate(`${month}-01`)
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const lead = (first.getDay() - weekStartsOn + 7) % 7
  const cells: (string | null)[] = Array(lead).fill(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(toISODate(new Date(first.getFullYear(), first.getMonth(), d)))
  }
  while (cells.length % 7) cells.push(null)
  const weeks: (string | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

/** Narrow weekday names in display order, e.g. ['M', 'T', …]. */
export function weekdayNames(locale: string | undefined, weekStartsOn: 0 | 1 = 1, style: 'narrow' | 'short' = 'narrow') {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: style })
  // 2023-01-01 was a Sunday
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2023, 0, 1 + ((i + weekStartsOn) % 7))))
}

/**
 * Runs of consecutive cells in one week that pass `test`, as `{ start, length }` column spans.
 * Used to draw one continuous bar across a booked stretch or a selected range, rather than a
 * separate shape in every cell.
 */
export function weekRuns(week: (string | null)[], test: (iso: string) => boolean) {
  const runs: { start: number; length: number }[] = []
  week.forEach((iso, col) => {
    const hit = iso !== null && test(iso)
    const last = runs[runs.length - 1]
    if (hit && last && last.start + last.length === col) last.length++
    else if (hit) runs.push({ start: col, length: 1 })
  })
  return runs
}
