import Link from 'next/link'

const STORYBOOK_URL = 'https://6a251cdcacca87566659252b-mxrwfqmaxy.chromatic.com/'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between max-w-5xl px-4 md:px-8 py-6 md:py-8">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-foreground">AI Chat UI</span>
          <span className="text-xs text-muted-foreground">
            White-label AI chat components by{' '}
            <a href="https://github.com/lizzie-teo" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Lizzie Teo
            </a>
            {' '}— MIT License © 2026
          </span>
        </div>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/figma-make" className="hover:text-foreground transition-colors">Figma Make</Link>
          <a href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Storybook ↗</a>
          <a href="https://www.npmjs.com/package/@lizzie-teo/conjure-ui" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">npm ↗</a>
          <a href="https://github.com/lizzie-teo/conjure-ui" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub ↗</a>
        </nav>
      </div>
    </footer>
  )
}
