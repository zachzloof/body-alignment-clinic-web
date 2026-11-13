import manifest from '@/data/images.manifest.json'

/** Every image the pipeline knows about. A typo in a name fails type-checking. */
export type ImageName = keyof typeof manifest

export interface ImageInfo {
  /** intrinsic size of the original */
  w: number
  h: number
  /** widths generated in public/img, ascending */
  widths: number[]
  /** average colour, shown while the image loads */
  bg: string
  alpha: boolean
}

export const images: Record<ImageName, ImageInfo> = manifest

export function srcset(name: ImageName, format: 'avif' | 'webp'): string {
  return images[name].widths.map((w) => `/img/${name}-${w}.${format} ${w}w`).join(', ')
}

/** A single URL, for <img src> fallbacks: the generated width closest to `target`. */
export function imageUrl(name: ImageName, target = 800, format: 'avif' | 'webp' = 'webp'): string {
  const widths = images[name].widths
  const w = widths.find((x) => x >= target) ?? widths[widths.length - 1]
  return `/img/${name}-${w}.${format}`
}
