import { Show } from "solid-js"
import { Input } from "#ui/input/input/Input.jsx"
import { RegisterLoginField } from "../../../registerLogin/RegisterLoginField.jsx"
import { RegisterLoginHeading } from "../../../registerLogin/RegisterLoginHeading.jsx"
import { RegisterLoginPasswordInput } from "../../../registerLogin/RegisterLoginPasswordInput.jsx"
import { RegisterLoginShell } from "../../../registerLogin/RegisterLoginShell.jsx"
import { RegisterLoginSubmit } from "../../../registerLogin/RegisterLoginSubmit.jsx"
import { cmsNavigate } from "../../shell/cmsNavigate.js"
import { cmsExtraAuthStateCreate } from "./cmsExtraAuthStateCreate.js"

export function CmsExtraAuthView(props: { mode: "reset" | "2fa" | "verify-email" | "invite" | "session-expired" }) {
  const state = cmsExtraAuthStateCreate(props.mode)
  return (
    <RegisterLoginShell
      privacy={state.texts().privacy}
      legal={state.texts().legal}
      help={state.texts().help}
      headerAction={
        <button type="button" class="text-button whitespace-nowrap" onClick={() => cmsNavigate("dashboard")}>
          ← Admin
        </button>
      }
    >
      <RegisterLoginHeading title={state.text()[props.mode][0]} description={state.text()[props.mode][1]} />
      <form class="form-stack" onSubmit={state.submit}>
        <Show when={props.mode === "invite"}>
          <RegisterLoginField id="inviteName" label={state.text().name}>
            <Input id="inviteName" name="name" type="text" autocomplete="name" required />
          </RegisterLoginField>
          <RegisterLoginField id="inviteEmail" label={state.text().email}>
            <Input id="inviteEmail" name="email" type="email" autocomplete="email" value="alex@example.com" required />
          </RegisterLoginField>
        </Show>
        <Show when={props.mode === "invite" || props.mode === "reset"}>
          <RegisterLoginField
            id="newPassword"
            label={props.mode === "reset" ? state.text().newPassword : state.text().password}
          >
            <RegisterLoginPasswordInput
              visible={state.visible()}
              showLabel={state.texts().showPassword}
              hideLabel={state.texts().hidePassword}
              onToggle={state.toggleVisible}
            >
              <Input
                id="newPassword"
                name="password"
                type={state.visible() ? "text" : "password"}
                autocomplete="new-password"
                minlength={8}
                required
              />
            </RegisterLoginPasswordInput>
          </RegisterLoginField>
        </Show>
        <Show when={props.mode === "2fa"}>
          <RegisterLoginField id="code" label={state.text().code}>
            <Input
              id="code"
              name="code"
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              pattern="[0-9]{6}"
              maxlength={6}
              placeholder="000000"
              required
            />
          </RegisterLoginField>
        </Show>
        <RegisterLoginSubmit loading={false}>{state.text()[props.mode][2]}</RegisterLoginSubmit>
      </form>
      <Show when={props.mode === "verify-email"}>
        <p class="text-center" style={{ "margin-top": "24px" }}>
          <button class="text-button" type="button" onClick={state.resend}>
            {state.text().resend}
          </button>
        </p>
        <Show when={state.resent()}>
          <p class="mt-2 text-center" role="status">
            {state.text().resent}
          </p>
        </Show>
      </Show>
      <Show when={props.mode !== "verify-email" && props.mode !== "session-expired"}>
        <p class="!mt-6 text-center">
          <button class="text-button" type="button" onClick={() => cmsNavigate("auth-login")}>
            {state.text().back}
          </button>
        </p>
      </Show>
    </RegisterLoginShell>
  )
}
