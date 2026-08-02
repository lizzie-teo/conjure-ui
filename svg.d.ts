// Static asset module declarations for the library build.
// The Next.js harness gets these from next-env.d.ts, but tsconfig.build.json
// overrides `include` and so drops that file — the library build needs its own.

declare module '*.svg' {
  const url: string
  export default url
}

declare module '*.png' {
  const url: string
  export default url
}

declare module '*.jpg' {
  const url: string
  export default url
}

declare module '*.jpeg' {
  const url: string
  export default url
}

declare module '*.webp' {
  const url: string
  export default url
}

declare module '*.avif' {
  const url: string
  export default url
}
