import { Button } from "#ui/interactive/button/Button.jsx"
import { cmsLocale } from "../i18n/cmsLocale.js"

const t = (de: string, en: string) => (cmsLocale.get() === "de" ? de : en)

/** Save/discard actions for a settings form; sticky from md so they stay reachable, static on mobile so they never cover fields. */
export function CmsSaveBar(p: { dirty: boolean; onDiscard: () => void }) {
  return (
    <div
      class={
        "md:sticky md:bottom-0 -mx-1 px-1 py-3 flex flex-wrap items-center justify-end gap-3 bg-background dark:bg-[#222326] border-t border-transparent"
      }
    >
      <span class={"mr-auto w-full sm:w-auto text-xs text-neutral-500 dark:text-neutral-400"} aria-live={"polite"}>
        {p.dirty
          ? t("Ungespeicherte Änderungen", "Unsaved changes")
          : t("Alle Änderungen gespeichert", "All changes saved")}
      </span>
      <Button variant={"ghost"} class={"text-sm"} disabled={!p.dirty} onClick={() => p.onDiscard()}>
        {t("Verwerfen", "Discard")}
      </Button>
      <Button type={"submit"} variant={"contrast"} class={"text-sm"} disabled={!p.dirty}>
        {t("Speichern", "Save")}
      </Button>
    </div>
  )
}
