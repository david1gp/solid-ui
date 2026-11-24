import { For } from "solid-js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsRolesStateCreate } from "./cmsRolesStateCreate.js"

export function CmsRolesView(_props: { id?: string }) {
  const state = cmsRolesStateCreate()
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
      <For each={state.roles()}>
        {(role) => (
          <section class="rounded-2xl border p-4 dark:border-gray-700">
            <h2 class="mb-4 font-semibold">{role}</h2>
            <div class="w-full max-w-full overflow-x-auto">
              <table class="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr>
                    <th class="p-2">{state.text().resource}</th>
                    <For each={["read", "create", "edit", "delete"] as const}>
                      {(action) => <th class="p-2">{state.text()[action]}</th>}
                    </For>
                  </tr>
                </thead>
                <tbody>
                  <For each={["pages", "posts", "media", "users"] as const}>
                    {(resource) => (
                      <tr class="border-t dark:border-gray-700">
                        <th class="p-2 font-normal">{state.text()[resource]}</th>
                        <For each={["read", "create", "edit", "delete"] as const}>
                          {(action) => (
                            <td class="p-2">
                              <input
                                type="checkbox"
                                aria-label={`${role}: ${state.text()[resource]} – ${state.text()[action]}`}
                                checked={state.checked(role, resource, action)}
                                onChange={(event) => state.toggle(role, resource, action, event.currentTarget.checked)}
                              />
                            </td>
                          )}
                        </For>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </For>
    </div>
  )
}
