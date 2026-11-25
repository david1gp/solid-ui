import { Show } from "solid-js"
import { CmsDataTable } from "../../ui/CmsDataTable.js"
import { cmsDangerPillClass } from "../../ui/cmsDangerPillClass.js"
import { cmsInputClass } from "../../ui/cmsInputClass.js"
import { CmsSaveBar } from "../../ui/CmsSaveBar.js"
import { ConfirmDialog } from "../../ui/ConfirmDialog.js"
import type { CmsUserStatus } from "./cmsUserStatus.js"
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
                <form
                  class="flex flex-col gap-4 rounded-2xl border p-4 text-sm dark:border-gray-700"
                  onSubmit={(event) => {
                    event.preventDefault()
                    state.submit()
                  }}
                >
                  <p>
                    <strong>{state.text().email}:</strong> {user().email}
                  </p>
                  <label class="flex items-center gap-4">
                    <span>{state.text().role}</span>
                    <select
                      class={cmsInputClass}
                      value={state.draftRole()}
                      onChange={(event) => state.draftRoleSet(event.currentTarget.value)}
                    >
                      <option>Administrator</option>
                      <option disabled={state.lastAdmin()}>Editor</option>
                      <option disabled={state.lastAdmin()}>Author</option>
                    </select>
                  </label>
                  <label class="flex items-center gap-4">
                    <span>{state.text().status}</span>
                    <select
                      class={cmsInputClass}
                      value={state.draftStatus()}
                      onChange={(event) => state.draftStatusSet(event.currentTarget.value as CmsUserStatus)}
                    >
                      <option value="Aktiv">{state.text().active}</option>
                      <option value="Deaktiviert" disabled={state.lastAdmin()}>
                        {state.text().deactivated}
                      </option>
                      <Show when={user().status === "Eingeladen"}>
                        <option value="Eingeladen">{state.text().invited}</option>
                      </Show>
                    </select>
                  </label>
                  <div>
                    <span
                      class={
                        user().status === "Eingeladen"
                          ? cmsPillClass
                          : user().status === "Deaktiviert"
                            ? cmsDangerPillClass
                            : cmsSuccessPillClass
                      }
                    >
                      {state.statusLabel(user().status)}
                    </span>
                  </div>
                  <Show when={state.lastAdmin()}>
                    <p>{state.text().guard}</p>
                  </Show>
                  <Show when={state.dirty()}>
                    <CmsSaveBar dirty={state.dirty()} onDiscard={state.discard} />
                  </Show>
                  <ConfirmDialog
                    title={state.text().confirm}
                    description={state.text().confirmDescription}
                    open={state.confirmOpen()}
                    onOpenChange={state.confirmOpenSet}
                    onConfirm={state.save}
                    confirmLabel={state.text().deactivate}
                    cancelLabel={state.text().cancel}
                    destructive
                  />
                </form>
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
            {
              id: "status",
              label: state.text().status,
              value: (row) => state.statusLabel(row.status),
              render: (row) => (
                <span
                  class={
                    row.status === "Eingeladen"
                      ? cmsPillClass
                      : row.status === "Deaktiviert"
                        ? cmsDangerPillClass
                        : cmsSuccessPillClass
                  }
                >
                  {state.statusLabel(row.status)}
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
