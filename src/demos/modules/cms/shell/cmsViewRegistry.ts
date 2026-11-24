import { mdiAccountGroup } from "@adaptive-ds/mdi/mdiAccountGroup.js"
import { mdiClipboardTextOutline } from "@adaptive-ds/mdi/mdiClipboardTextOutline.js"
import { mdiCogOutline } from "@adaptive-ds/mdi/mdiCogOutline.js"
import { mdiFileDocumentOutline } from "@adaptive-ds/mdi/mdiFileDocumentOutline.js"
import { mdiFolderMultipleOutline } from "@adaptive-ds/mdi/mdiFolderMultipleOutline.js"
import { mdiFolderOutline } from "@adaptive-ds/mdi/mdiFolderOutline.js"
import { mdiLockReset } from "@adaptive-ds/mdi/mdiLockReset.js"
import { mdiShieldAccountOutline } from "@adaptive-ds/mdi/mdiShieldAccountOutline.js"
import { mdiTextBoxOutline } from "@adaptive-ds/mdi/mdiTextBoxOutline.js"
import { mdiViewDashboardOutline } from "@adaptive-ds/mdi/mdiViewDashboardOutline.js"
import { mdiWeb } from "@adaptive-ds/mdi/mdiWeb.js"
import { CmsDashboardView } from "../views/dashboard/CmsDashboardView.js"
import { CmsPagesView } from "../views/pages/CmsPagesView.js"
import { CmsPostsView } from "../views/posts/CmsPostsView.js"
import { CmsMediaView } from "../views/media/CmsMediaView.js"
import { CmsMenusView } from "../views/menus/CmsMenusView.js"
import { CmsContentTypesView } from "../views/content-types/CmsContentTypesView.js"
import { CmsTranslationsView } from "../views/translations/CmsTranslationsView.js"
import { CmsUsersView } from "../views/users/CmsUsersView.js"
import { CmsRolesView } from "../views/roles/CmsRolesView.js"
import { CmsTeamsView } from "../views/teams/CmsTeamsView.js"
import { CmsSettingsGeneralView } from "../views/settings-general/CmsSettingsGeneralView.js"
import { CmsIntegrationsView } from "../views/integrations/CmsIntegrationsView.js"
import { CmsApiKeysView } from "../views/api-keys/CmsApiKeysView.js"
import { CmsAuditLogView } from "../views/audit-log/CmsAuditLogView.js"
import { CmsNotificationsView } from "../views/notifications/CmsNotificationsView.js"
import { CmsImportExportView } from "../views/import-export/CmsImportExportView.js"
import { CmsBackupsView } from "../views/backups/CmsBackupsView.js"
import { CmsSystemStatusView } from "../views/system-status/CmsSystemStatusView.js"
import { CmsTrashView } from "../views/trash/CmsTrashView.js"
import { CmsAuthLoginView } from "../views/auth-login/CmsAuthLoginView.js"
import { CmsAuthRegisterView } from "../views/auth-register/CmsAuthRegisterView.js"
import { CmsAuthForgotView } from "../views/auth-forgot/CmsAuthForgotView.js"
import { CmsAuthResetView } from "../views/auth-reset/CmsAuthResetView.js"
import { CmsAuth2faView } from "../views/auth-2fa/CmsAuth2faView.js"
import { CmsAuthVerifyEmailView } from "../views/auth-verify-email/CmsAuthVerifyEmailView.js"
import { CmsAuthInviteView } from "../views/auth-invite/CmsAuthInviteView.js"
import { CmsAuthSessionExpiredView } from "../views/auth-session-expired/CmsAuthSessionExpiredView.js"

// Registry contract: each view receives optional `id`, navigates with cmsNavigate(view, id?),
// reads cmsLocale.get(), and owns its local { de, en } texts. Layout is app, auth or fullscreen.
export const cmsViewRegistry = {
  dashboard: {
    group: "overview",
    icon: mdiViewDashboardOutline,
    label: { de: "Dashboard", en: "Dashboard" },
    component: CmsDashboardView,
    layout: "app",
  },
  pages: {
    group: "content",
    icon: mdiFileDocumentOutline,
    label: { de: "Seiten", en: "Pages" },
    component: CmsPagesView,
    layout: "app",
  },
  posts: {
    group: "content",
    icon: mdiTextBoxOutline,
    label: { de: "Beiträge", en: "Posts" },
    component: CmsPostsView,
    layout: "app",
  },
  media: {
    group: "content",
    icon: mdiFolderOutline,
    label: { de: "Medien", en: "Media" },
    component: CmsMediaView,
    layout: "app",
  },
  menus: {
    group: "content",
    icon: mdiFolderMultipleOutline,
    label: { de: "Menüs", en: "Menus" },
    component: CmsMenusView,
    layout: "app",
  },
  "content-types": {
    group: "content",
    icon: mdiTextBoxOutline,
    label: { de: "Inhaltstypen", en: "Content types" },
    component: CmsContentTypesView,
    layout: "app",
  },
  translations: {
    group: "content",
    icon: mdiWeb,
    label: { de: "Übersetzungen", en: "Translations" },
    component: CmsTranslationsView,
    layout: "app",
  },
  users: {
    group: "management",
    icon: mdiAccountGroup,
    label: { de: "Benutzer", en: "Users" },
    component: CmsUsersView,
    layout: "app",
  },
  roles: {
    group: "management",
    icon: mdiShieldAccountOutline,
    label: { de: "Rollen", en: "Roles" },
    component: CmsRolesView,
    layout: "app",
  },
  teams: {
    group: "management",
    icon: mdiAccountGroup,
    label: { de: "Teams", en: "Teams" },
    component: CmsTeamsView,
    layout: "app",
  },
  "settings-general": {
    group: "system",
    icon: mdiCogOutline,
    label: { de: "Allgemein", en: "General" },
    component: CmsSettingsGeneralView,
    layout: "app",
  },
  integrations: {
    group: "system",
    icon: mdiWeb,
    label: { de: "Integrationen", en: "Integrations" },
    component: CmsIntegrationsView,
    layout: "app",
  },
  "api-keys": {
    group: "system",
    icon: mdiLockReset,
    label: { de: "API-Schlüssel", en: "API keys" },
    component: CmsApiKeysView,
    layout: "app",
  },
  "audit-log": {
    group: "system",
    icon: mdiClipboardTextOutline,
    label: { de: "Audit-Protokoll", en: "Audit log" },
    component: CmsAuditLogView,
    layout: "app",
  },
  notifications: {
    group: "system",
    icon: mdiTextBoxOutline,
    label: { de: "Benachrichtigungen", en: "Notifications" },
    component: CmsNotificationsView,
    layout: "app",
  },
  "import-export": {
    group: "system",
    icon: mdiFolderOutline,
    label: { de: "Import / Export", en: "Import / Export" },
    component: CmsImportExportView,
    layout: "app",
  },
  backups: {
    group: "system",
    icon: mdiFolderMultipleOutline,
    label: { de: "Backups", en: "Backups" },
    component: CmsBackupsView,
    layout: "app",
  },
  "system-status": {
    group: "system",
    icon: mdiCogOutline,
    label: { de: "Systemstatus", en: "System status" },
    component: CmsSystemStatusView,
    layout: "app",
  },
  trash: {
    group: "system",
    icon: mdiFolderOutline,
    label: { de: "Papierkorb", en: "Trash" },
    component: CmsTrashView,
    layout: "app",
  },
  "auth-login": {
    group: "auth",
    icon: mdiLockReset,
    label: { de: "Anmelden", en: "Sign in" },
    component: CmsAuthLoginView,
    layout: "auth",
  },
  "auth-register": {
    group: "auth",
    icon: mdiLockReset,
    label: { de: "Registrieren", en: "Register" },
    component: CmsAuthRegisterView,
    layout: "auth",
  },
  "auth-forgot": {
    group: "auth",
    icon: mdiLockReset,
    label: { de: "Passwort vergessen", en: "Forgot password" },
    component: CmsAuthForgotView,
    layout: "auth",
  },
  "auth-reset": {
    group: "auth",
    icon: mdiLockReset,
    label: { de: "Passwort zurücksetzen", en: "Reset password" },
    component: CmsAuthResetView,
    layout: "auth",
  },
  "auth-2fa": {
    group: "auth",
    icon: mdiLockReset,
    label: { de: "Zwei-Faktor-Authentifizierung", en: "Two-factor authentication" },
    component: CmsAuth2faView,
    layout: "auth",
  },
  "auth-verify-email": {
    group: "auth",
    icon: mdiLockReset,
    label: { de: "E-Mail bestätigen", en: "Verify email" },
    component: CmsAuthVerifyEmailView,
    layout: "auth",
  },
  "auth-invite": {
    group: "auth",
    icon: mdiLockReset,
    label: { de: "Einladung annehmen", en: "Accept invitation" },
    component: CmsAuthInviteView,
    layout: "auth",
  },
  "auth-session-expired": {
    group: "auth",
    icon: mdiLockReset,
    label: { de: "Sitzung abgelaufen", en: "Session expired" },
    component: CmsAuthSessionExpiredView,
    layout: "auth",
  },
} as const
