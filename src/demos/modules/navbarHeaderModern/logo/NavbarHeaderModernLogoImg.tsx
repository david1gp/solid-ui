import { navbarHeaderModernImgZoomInOnHoverClass } from "#src/demos/modules/navbarHeaderModern/logo/navbarHeaderModernImgZoomInOnHoverClass.js"
import { navbarHeaderModernInvertBlackClass } from "#src/demos/modules/navbarHeaderModern/logo/navbarHeaderModernInvertBlackClass.js"
import { classArr } from "#ui/utils/classArr.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface NavbarHeaderModernLogoImgProps extends MayHaveClass {
  src: string
  alt: string
  zoomIn?: boolean
  invertColorsInDarkMode?: boolean
  width?: string | number
  height?: string | number
}

/** Lazy-loaded image with optional zoom and dark-mode invert. */
export function NavbarHeaderModernLogoImg(p: NavbarHeaderModernLogoImgProps) {
  return (
    <img
      src={p.src}
      alt={p.alt}
      class={classArr(
        p.zoomIn && navbarHeaderModernImgZoomInOnHoverClass,
        p.invertColorsInDarkMode && navbarHeaderModernInvertBlackClass,
        p.class,
      )}
      loading="lazy"
      decoding="async"
      draggable="false"
      width={p.width}
      height={p.height}
    />
  )
}
