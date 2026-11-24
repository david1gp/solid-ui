import { For, Show } from "solid-js"
import { Input } from "#ui/input/input/Input.jsx"
import type { demoRegisterLoginStateCreate } from "../demoRegisterLoginStateCreate.js"
import { FieldError } from "../FieldError.jsx"
import { RegisterLoginField } from "./RegisterLoginField.jsx"
import { RegisterLoginPasswordInput } from "./RegisterLoginPasswordInput.jsx"
import { RegisterLoginSubmit } from "./RegisterLoginSubmit.jsx"

export function RegisterLoginDemoForm(props: { state: ReturnType<typeof demoRegisterLoginStateCreate> }) {
  const state = props.state
  return (
    <>
      <div class="tabs" data-active={state.mode()} role="tablist" aria-label={state.texts().accessType}>
        <span class="tab-indicator" aria-hidden="true" />
        <button
          class="tab"
          type="button"
          role="tab"
          aria-selected={state.mode() === "login" ? "true" : "false"}
          aria-controls="authForm"
          onClick={() => state.changeMode("login")}
        >
          {state.texts().signIn}
        </button>
        <button
          class="tab"
          type="button"
          role="tab"
          aria-selected={state.mode() === "register" ? "true" : "false"}
          aria-controls="authForm"
          onClick={() => state.changeMode("register")}
        >
          {state.texts().signUp}
        </button>
      </div>
      <form
        ref={state.setForm}
        class="form-stack"
        id="authForm"
        novalidate
        onSubmit={state.submit}
        onInput={state.clearError}
        onChange={state.clearError}
      >
        <Show when={state.mode() === "register"}>
          <RegisterLoginField id="name" label={state.texts().name} error={state.errors().name}>
            <Input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              placeholder={state.texts().namePlaceholder}
              required
              aria-invalid={state.errors().name ? "true" : undefined}
              aria-describedby={state.errors().name ? "nameError" : undefined}
            />
          </RegisterLoginField>
        </Show>
        <RegisterLoginField id="email" label={state.texts().email} error={state.errors().email}>
          <Input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            placeholder={state.texts().emailPlaceholder}
            required
            aria-invalid={state.errors().email ? "true" : undefined}
            aria-describedby={state.errors().email ? "emailError" : undefined}
            onInput={(e) => state.emailInput(e.currentTarget.value)}
          />
        </RegisterLoginField>
        <div class="field">
          <div class="field-header">
            <label for="password">{state.texts().password}</label>
            <Show when={state.mode() === "login"}>
              <button class="forgot-button" type="button" onClick={state.openReset}>
                {state.texts().forgot}
              </button>
            </Show>
          </div>
          <RegisterLoginPasswordInput
            visible={state.visible()}
            showLabel={state.texts().showPassword}
            hideLabel={state.texts().hidePassword}
            onToggle={state.toggleVisible}
          >
            <Input
              id="password"
              name="password"
              type={state.visible() ? "text" : "password"}
              autocomplete={state.mode() === "register" ? "new-password" : "current-password"}
              placeholder={state.texts().passwordPlaceholder}
              minlength={8}
              required
              aria-invalid={state.errors().password ? "true" : undefined}
              aria-describedby={state.errors().password ? "passwordError" : undefined}
              onInput={(e) => state.passwordInput(e.currentTarget.value)}
            />
          </RegisterLoginPasswordInput>
          <FieldError id="passwordError" message={state.errors().password} />
          <Show when={state.mode() === "register"}>
            <div>
              <div class="password-strength" aria-hidden="true">
                <For each={[0, 1, 2, 3]}>
                  {(index) => (
                    <span
                      class={[
                        "strength-bar",
                        {
                          active: index < state.score(),
                          weak: state.score() <= 1,
                          medium: state.score() > 1 && state.score() <= 3,
                          strong: state.score() === 4,
                        },
                      ]}
                    />
                  )}
                </For>
              </div>
              <p class="password-hint">
                {!state.password()
                  ? state.texts().passwordHint
                  : `${state.texts().strength}: ${state.score() <= 1 ? state.texts().weak : state.score() <= 3 ? state.texts().medium : state.texts().strong}`}
              </p>
            </div>
          </Show>
        </div>
        <Show
          when={state.mode() === "login"}
          fallback={
            <div class="field">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  aria-invalid={state.errors().terms ? "true" : undefined}
                  aria-describedby={state.errors().terms ? "termsError" : undefined}
                />
                <span class="checkbox" aria-hidden="true">
                  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="m2.2 6.2 2.3 2.2 5.2-5" stroke="currentColor" stroke-width="1.8" />
                  </svg>
                </span>
                <span>
                  {state.texts().termsPrefix}
                  <a href="#authTitle">{state.texts().terms}</a>
                  {state.texts().termsAnd}
                  <a href="#authTitle">{state.texts().privacyPolicy}</a>.
                </span>
              </label>
              <FieldError id="termsError" message={state.errors().terms} />
            </div>
          }
        >
          <div class="options-row">
            <label class="checkbox-label">
              <input type="checkbox" name="remember" />
              <span class="checkbox" aria-hidden="true">
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="m2.2 6.2 2.3 2.2 5.2-5" stroke="currentColor" stroke-width="1.8" />
                </svg>
              </span>
              <span>{state.texts().remember}</span>
            </label>
          </div>
        </Show>
        <RegisterLoginSubmit loading={state.loading()}>
          {state.mode() === "register" ? state.texts().createAccount : state.texts().signIn}
        </RegisterLoginSubmit>
      </form>
    </>
  )
}
