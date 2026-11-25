const current = [
  {
    id: "payment",
    type: "payment",
    title: { de: "Zahlungseingang", en: "Payment received" },
    subtitle: { de: "Rechnung #1042 bezahlt", en: "Invoice #1042 paid" },
    amount: 1240,
  },
  {
    id: "form-error",
    type: "error",
    title: { de: "Fehler", en: "Error" },
    subtitle: { de: "Formular-Versand fehlgeschlagen", en: "Form submission failed" },
  },
  {
    id: "contact",
    type: "message",
    title: { de: "E-Mail-Anfrage", en: "Email inquiry" },
    subtitle: { de: "Kontaktformular – Anna Schmidt", en: "Contact form – Anna Schmidt" },
  },
  {
    id: "backup-error",
    type: "error",
    title: { de: "Fehler", en: "Error" },
    subtitle: { de: "Backup fehlgeschlagen", en: "Backup failed" },
  },
  {
    id: "message",
    type: "message",
    title: { de: "Neue Nachricht", en: "New message" },
    subtitle: { de: "Anfrage von Thomas Weber", en: "Inquiry from Thomas Weber" },
  },
] as const

const now = Date.now()
export const cmsNotificationsData = [
  ...current.map((item, index) => ({
    ...item,
    createdAt: new Date(now - ([5, 35, 180, 1440, 2880][index] ?? 0) * 60_000),
    isCurrent: true,
  })),
  {
    id: "backup-success",
    type: "success",
    title: { de: "Backup erfolgreich", en: "Backup successful" },
    subtitle: { de: "Das Backup wurde abgeschlossen", en: "Backup completed" },
    createdAt: new Date(now - 4 * 86_400_000),
    isCurrent: false,
  },
  {
    id: "old-payment",
    type: "payment",
    title: { de: "Zahlungseingang", en: "Payment received" },
    subtitle: { de: "Rechnung #1038 bezahlt", en: "Invoice #1038 paid" },
    amount: 890,
    createdAt: new Date(now - 8 * 86_400_000),
    isCurrent: false,
  },
  {
    id: "old-contact",
    type: "message",
    title: { de: "E-Mail-Anfrage", en: "Email inquiry" },
    subtitle: { de: "Kontaktformular – Marie Fischer", en: "Contact form – Marie Fischer" },
    createdAt: new Date(now - 12 * 86_400_000),
    isCurrent: false,
  },
  {
    id: "form-recovered",
    type: "success",
    title: { de: "Formular wieder erreichbar", en: "Form available again" },
    subtitle: { de: "Der Formularversand funktioniert wieder", en: "Form submissions are working again" },
    createdAt: new Date(now - 20 * 86_400_000),
    isCurrent: false,
  },
] as const
