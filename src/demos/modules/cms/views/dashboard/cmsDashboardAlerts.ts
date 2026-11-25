import { cmsNotificationsData } from "../../notifications/cmsNotificationsData.js"

export const cmsDashboardAlerts = cmsNotificationsData.filter((item) => item.isCurrent)
