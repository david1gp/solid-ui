import { Show } from "solid-js"
import { CmsDataTable } from "../../ui/CmsDataTable.js"
import { cmsPillClass } from "../../ui/cmsPillClass.js"
import { cmsPrimaryButtonClass } from "../../ui/cmsPrimaryButtonClass.js"
import { cmsSuccessPillClass } from "../../ui/cmsSuccessPillClass.js"
import { Drawer } from "../../ui/Drawer.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsUsersStateCreate } from "./cmsUsersStateCreate.js"

const control = "w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-700"
const button =
  "rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
export function CmsUsersView(props: { id?: string }) {
  const state = cmsUsersStateCreate(() => props)
  return (
    <div class="space-y-6">
      <Show
        when={!props.id}
        fallback={
          <div class="space-y-5">
            <button type="button" class={button} onClick={state.back}>
              ← {state.text().back}
            </button>
            <PageHeader title={state.user()?.name ?? state.text().details} />
            <Show when={state.user()}>
              {(user) => (
                <div class="space-y-3 rounded-2xl border p-4 text-sm dark:border-gray-700">
                  <p>
                    <strong>{state.text().email}:</strong> {user().email}
                  </p>
                  <p>
                    <strong>{state.text().role}:</strong> {user().role}
                  </p>
                  <p>
                    <strong>{state.text().team}:</strong> {user().team}
                  </p>
                  <p>
                    <strong>{state.text().status}:</strong>{" "}
                    {user().status === "Eingeladen" ? state.text().invited : state.text().active}
                  </p>
                </div>
              )}
            </Show>
          </div>
        }
      >
        <PageHeader
          title={state.text().title}
          description={state.text().description}
          actions={
            <button type="button" class={cmsPrimaryButtonClass} onClick={() => state.openSet(true)}>
              {state.text().invite}
            </button>
          }
        />
        <CmsDataTable
          rows={state.users()}
          rowId={(row) => row.id}
          labels={
            cmsLocale.get() === "en"
              ? {
                  search: "Search",
                  filter: "Filter",
                  all: "All",
                  columns: "Columns",
                  selected: "selected",
                  previous: "Previous",
                  next: "Next",
                  page: "Page",
                  noResults: "No results",
                  selectAll: "Select all",
                  selectRow: "Select row",
                  pageSize: "Rows per page",
                }
              : { noResults: "Keine Ergebnisse" }
          }
          bulkActions={[{ label: state.text().remove, run: (rows) => state.remove(rows.map((row) => row.id)) }]}
          columns={[
            {
              id: "name",
              label: state.text().name,
              value: (row) => row.name,
              sortable: true,
              searchable: true,
              render: (row) => (
                <button
                  type="button"
                  class="flex items-center gap-2 text-left font-medium hover:text-[var(--dashboard-accent)]"
                  onClick={() => state.detail(row.id)}
                >
                  <span
                    aria-hidden="true"
                    class="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs dark:bg-neutral-700"
                  >
                    {row.name
                      .split(/\s+/)
                      .map((part) => part.charAt(0))
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  {row.name}
                </button>
              ),
            },
            { id: "email", label: state.text().email, value: (row) => row.email, searchable: true },
            {
              id: "role",
              label: state.text().role,
              value: (row) => row.role,
              filterable: true,
              render: (row) => <span class={cmsPillClass}>{row.role}</span>,
            },
            { id: "team", label: state.text().team, value: (row) => row.team, filterable: true },
            {
              id: "status",
              label: state.text().status,
              value: (row) => (row.status === "Eingeladen" ? state.text().invited : state.text().active),
              render: (row) => (
                <span class={row.status === "Eingeladen" ? cmsPillClass : cmsSuccessPillClass}>
                  {row.status === "Eingeladen" ? state.text().invited : state.text().active}
                </span>
              ),
              filterable: true,
            },
          ]}
        />
        <Drawer title={state.text().invite} open={state.open()} onOpenChange={state.openSet}>
          <form
            class="space-y-4 p-4 text-sm"
            onSubmit={(event) => {
              event.preventDefault()
              state.invite()
            }}
          >
            <label class="block space-y-1">
              <span>{state.text().name}</span>
              <input
                class={control}
                value={state.name()}
                onInput={(event) => state.nameSet(event.currentTarget.value)}
              />
            </label>
            <label class="block space-y-1">
              <span>{state.text().email}</span>
              <input
                required
                type="email"
                class={control}
                value={state.email()}
                onInput={(event) => state.emailSet(event.currentTarget.value)}
              />
            </label>
            <label class="block space-y-1">
              <span>{state.text().role}</span>
              <select
                class={control}
                value={state.role()}
                onChange={(event) => state.roleSet(event.currentTarget.value)}
              >
                <option>Administrator</option>
                <option>Editor</option>
                <option>Author</option>
              </select>
            </label>
            <label class="block space-y-1">
              <span>{state.text().team}</span>
              <select
                class={control}
                value={state.team()}
                onChange={(event) => state.teamSet(event.currentTarget.value)}
              >
                <option>Redaktion</option>
                <option>Marketing</option>
                <option>Entwicklung</option>
              </select>
            </label>
            <div class="flex gap-2">
              <button class={button} type="submit">
                {state.text().send}
              </button>
              <button class={button} type="button" onClick={() => state.openSet(false)}>
                {state.text().cancel}
              </button>
            </div>
          </form>
        </Drawer>
      </Show>
    </div>
  )
}
