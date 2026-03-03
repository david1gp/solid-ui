import { BlackBulletPoints, type BlackBulletPointsProps } from "~ui/static/lists/BlackBulletPoints"

export function BlueBulletPoints(p: BlackBulletPointsProps) {
  return <BlackBulletPoints classBullet="text-blue-500 dark:text-blue-500" {...p} />
}
