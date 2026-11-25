export function cmsNotificationActionGet(id: string, locale: "de" | "en") {
  const actions = {
    payment: {
      kind: "navigation",
      label: ["Rechnung ansehen", "View invoice"],
      feedback: ["Demo: Rechnung #1042 würde geöffnet", "Demo: Invoice #1042 would be opened"],
    },
    "old-payment": {
      kind: "navigation",
      label: ["Rechnung ansehen", "View invoice"],
      feedback: ["Demo: Rechnung #1038 würde geöffnet", "Demo: Invoice #1038 would be opened"],
    },
    "form-error": {
      kind: "navigation",
      label: ["Formular-Log ansehen", "View form log"],
      feedback: ["Demo: Formular-Log würde geöffnet", "Demo: Form log would be opened"],
    },
    contact: {
      kind: "navigation",
      label: ["Anfrage öffnen", "Open inquiry"],
      feedback: ["Demo: Anfrage von Anna Schmidt würde geöffnet", "Demo: Inquiry from Anna Schmidt would be opened"],
    },
    message: {
      kind: "navigation",
      label: ["Anfrage öffnen", "Open inquiry"],
      feedback: ["Demo: Anfrage von Thomas Weber würde geöffnet", "Demo: Inquiry from Thomas Weber would be opened"],
    },
    "old-contact": {
      kind: "navigation",
      label: ["Anfrage öffnen", "Open inquiry"],
      feedback: ["Demo: Anfrage von Marie Fischer würde geöffnet", "Demo: Inquiry from Marie Fischer would be opened"],
    },
    "backup-error": {
      kind: "restart",
      label: ["Backup erneut starten", "Restart backup"],
      feedback: ["Demo: Backup wird erneut gestartet", "Demo: Backup is restarting"],
    },
  } as const
  const action = actions[id as keyof typeof actions]
  if (!action) return undefined
  const index = locale === "de" ? 0 : 1
  return { kind: action.kind, label: action.label[index], feedback: action.feedback[index] }
}
