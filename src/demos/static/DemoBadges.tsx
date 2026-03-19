import { Badge } from "#ui/static/badge/Badge"
import { type BadgeVariant, badgeVariant } from "#ui/static/badge/badgeCva"

export function DemoBadges() {
  const variants = Object.values(badgeVariant)
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">Badge Variants</h2>
      <div class="flex flex-wrap gap-4">
        {variants.map((variant) => (
          <Badge variant={variant as BadgeVariant}>{variant}</Badge>
        ))}
      </div>
    </div>
  )
}
