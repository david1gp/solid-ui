import { Badge } from "#ui/static/badge/Badge"
import { badgeVariant } from "#ui/static/badge/badgeCva"
import { PageWrapper } from "#ui/static/page/PageWrapper"
import { objectValues } from "#utils/obj/objectValues"

export function DemoBadge() {
  const variants = objectValues(badgeVariant)

  return (
    <PageWrapper>
      <h2 class="text-2xl font-bold mb-4">Badge Variants</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {variants.map((variant) => (
          <Badge variant={variant}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</Badge>
        ))}
      </div>
    </PageWrapper>
  )
}
