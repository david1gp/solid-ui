import { For } from "solid-js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsTeamsStateCreate } from "./cmsTeamsStateCreate.js"
export function CmsTeamsView(_props: { id?: string }) {
  const state = cmsTeamsStateCreate()
  return (
    <div class="space-y-6">
      <PageHeader title={state.text().title} description={state.text().description} />
      <form
        class="flex flex-wrap gap-2"
        onSubmit={(event) => {
          event.preventDefault()
          state.add()
        }}
      >
        <input
          class="rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-700"
          aria-label={state.text().name}
          placeholder={state.text().name}
          value={state.name()}
          onInput={(event) => state.nameSet(event.currentTarget.value)}
        />
        <button class="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700" type="submit">
          {state.text().add}
        </button>
      </form>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <For each={state.teams()}>
          {(team) => (
            <article class="rounded-2xl border p-4 dark:border-gray-700">
              <h2 class="font-semibold">{state.teamName(team.name)}</h2>
              <p class="mt-2 text-sm text-gray-500">{`${team.members} ${team.members === 1 ? state.text().member : state.text().members}`}</p>
            </article>
          )}
        </For>
      </div>
    </div>
  )
}
