import { For } from "solid-js"
import { cmsCardClass } from "../../ui/cmsCardClass.js"
import { cmsInputClass } from "../../ui/cmsInputClass.js"
import { cmsPrimaryButtonClass } from "../../ui/cmsPrimaryButtonClass.js"
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
          class={cmsInputClass}
          aria-label={state.text().name}
          placeholder={state.text().name}
          value={state.name()}
          onInput={(event) => state.nameSet(event.currentTarget.value)}
        />
        <button class={cmsPrimaryButtonClass} type="submit">
          {state.text().add}
        </button>
      </form>
      <For each={state.roles()}>
        {(role) => (
          <section class={cmsCardClass}>
            <h2 class="mb-4 font-semibold text-gray-900 dark:text-neutral-100">{role}</h2>
            <div class="w-full max-w-full overflow-x-auto">
              <table class="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr class="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-neutral-400">
                    <th class="p-2 font-medium">{state.text().resource}</th>
                    <For each={["read", "create", "edit", "delete"] as const}>
                      {(action) => <th class="p-2 font-medium">{state.text()[action]}</th>}
                    </For>
                  </tr>
                </thead>
                <tbody>
                  <For each={["posts", "media", "users"] as const}>
                    {(resource) => (
                      <tr class="border-t border-gray-200 dark:border-neutral-800">
                        <th class="p-2 font-normal">{state.text()[resource]}</th>
                        <For each={["read", "create", "edit", "delete"] as const}>
                          {(action) => (
                            <td class="p-2">
                              <input
                                type="checkbox"
                                class="accent-[var(--dashboard-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)]"
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
