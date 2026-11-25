import { expect, test } from "bun:test"
import { flush } from "solid-js"
import { cmsNotificationTimeFormat } from "../src/demos/modules/cms/notifications/cmsNotificationTimeFormat.js"
import { cmsNotificationsFilter } from "../src/demos/modules/cms/notifications/cmsNotificationsFilter.js"
import { cmsNotificationsStoreCreate } from "../src/demos/modules/cms/notifications/cmsNotificationsStoreCreate.js"

test("read state and dismissals update visible unread counts", () => {
  const store = cmsNotificationsStoreCreate()
  expect(store.visible()).toHaveLength(9)
  expect(store.unreadCount()).toBe(5)
  store.markRead("payment")
  flush()
  expect(store.unreadCount()).toBe(4)
  store.toggleRead("payment")
  store.dismiss("form-error")
  flush()
  expect(store.unreadCount()).toBe(4)
  expect(store.visible().some((item) => item.id === "form-error")).toBe(false)
  store.markAllRead()
  flush()
  expect(store.unreadCount()).toBe(0)
})

test("filters use current visible read state and types", () => {
  const store = cmsNotificationsStoreCreate()
  expect(cmsNotificationsFilter(store.visible(), "unread", store.isUnread)).toHaveLength(5)
  expect(cmsNotificationsFilter(store.visible(), "error", store.isUnread)).toHaveLength(2)
  store.markAllRead()
  flush()
  expect(cmsNotificationsFilter(store.visible(), "unread", store.isUnread)).toHaveLength(0)
})

test("time formatting switches from relative to localized date after seven days", () => {
  const now = Date.UTC(2026, 10, 25, 12)
  expect(cmsNotificationTimeFormat(new Date(now - 5 * 60_000), "en", now)).toContain("5 min")
  expect(cmsNotificationTimeFormat(new Date(now - 86_400_000), "de", now)).toBe("gestern")
  expect(cmsNotificationTimeFormat(new Date(now - 8 * 86_400_000), "en", now)).toContain("Nov")
})
