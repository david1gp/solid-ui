export const cmsDashboardAlerts = [
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
