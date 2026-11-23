import { For, Show } from "solid-js"
import { Input } from "#ui/input/input/Input.jsx"
import { Button } from "#ui/interactive/button/Button.jsx"
import { LogoImageText } from "#ui/static/logo/LogoImageText.jsx"
import { demoRegisterLoginStateCreate } from "./demoRegisterLoginStateCreate.js"
import { FieldError } from "./FieldError.jsx"
import "./DemoRegisterLogin.css"

export function DemoRegisterLogin() {
  const state = demoRegisterLoginStateCreate()
  return (
    <div class="register-login">
      <div class="page">
        <header class="site-header">
          <LogoImageText logoText="adaptive-solid-ui" logoTextClass="text-lg font-semibold" />
          {/* biome-ignore lint/a11y/useSemanticElements: The segmented toggle is specified as an ARIA group. */}
          <div class="language-toggle" role="group" aria-label={state.texts().language}>
            <button
              type="button"
              lang="de"
              aria-pressed={state.locale() === "de" ? "true" : "false"}
              onClick={() => state.changeLocale("de")}
            >
              DE
            </button>
            <button
              type="button"
              lang="en"
              aria-pressed={state.locale() === "en" ? "true" : "false"}
              onClick={() => state.changeLocale("en")}
            >
              EN
            </button>
          </div>
        </header>
        <main>
          <section class="auth-container" aria-labelledby="authTitle">
            <div class="auth-heading">
              <h1 id="authTitle">
                {state.mode() === "register" ? state.texts().createAccount : state.texts().welcome}
              </h1>
              <p>{state.mode() === "register" ? state.texts().registerDescription : state.texts().loginDescription}</p>
            </div>
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
                <div class="field">
                  <label for="name">{state.texts().name}</label>
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
                  <FieldError id="nameError" message={state.errors().name} />
                </div>
              </Show>
              <div class="field">
                <label for="email">{state.texts().email}</label>
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
                <FieldError id="emailError" message={state.errors().email} />
              </div>
              <div class="field">
                <div class="field-header">
                  <label for="password">{state.texts().password}</label>
                  <Show when={state.mode() === "login"}>
                    <button class="forgot-button" type="button" onClick={state.openReset}>
                      {state.texts().forgot}
                    </button>
                  </Show>
                </div>
                <div class="input-wrap">
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
                  <button
                    class="password-toggle"
                    type="button"
                    aria-label={state.visible() ? state.texts().hidePassword : state.texts().showPassword}
                    aria-pressed={state.visible() ? "true" : "false"}
                    onClick={state.toggleVisible}
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <Show
                        when={!state.visible()}
                        fallback={
                          <path
                            d="m4 4 16 16M10.6 6.1A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a15 15 0 0 1-2.2 2.8M14.6 14.6A3.7 3.7 0 0 1 9.4 9.4M6.2 7.1A16 16 0 0 0 2.5 12s3.5 6 9.5 6c1 0 1.9-.2 2.8-.5"
                            stroke="currentColor"
                            stroke-width="1.7"
                            stroke-linecap="round"
                          />
                        }
                      >
                        <path
                          d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                          stroke="currentColor"
                          stroke-width="1.7"
                        />
                        <circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.7" />
                      </Show>
                    </svg>
                  </button>
                </div>
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
              <Button
                class={`primary-button${state.loading() ? " loading" : ""}`}
                type="submit"
                disabled={state.loading()}
              >
                <span class="spinner" aria-hidden="true" />
                <span>{state.mode() === "register" ? state.texts().createAccount : state.texts().signIn}</span>
              </Button>
            </form>
            <div class="divider">
              <span>{state.mode() === "register" ? state.texts().orSignUp : state.texts().orSignIn}</span>
            </div>
            <div class="social-buttons">
              <For each={["Google", "Apple", "Microsoft"]}>
                {(provider) => (
                  <button class="social-button" type="button">
                    <Show
                      when={provider === "Google"}
                      fallback={
                        <Show
                          when={provider === "Apple"}
                          fallback={
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path fill="#f35325" d="M2 2h9.45v9.45H2z" />
                              <path fill="#81bc06" d="M12.55 2H22v9.45h-9.45z" />
                              <path fill="#05a6f0" d="M2 12.55h9.45V22H2z" />
                              <path fill="#ffba08" d="M12.55 12.55H22V22h-9.45z" />
                            </svg>
                          }
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.05 12.54c.02-2.12 1.74-3.14 1.82-3.19a3.9 3.9 0 0 0-3.08-1.67c-1.29-.13-2.54.77-3.2.77-.68 0-1.7-.76-2.8-.74a4.1 4.1 0 0 0-3.44 2.1c-1.49 2.58-.38 6.37 1.05 8.45.72 1.02 1.55 2.16 2.65 2.12 1.08-.04 1.48-.68 2.78-.68 1.29 0 1.67.68 2.79.65 1.15-.02 1.88-1.02 2.57-2.05a8.5 8.5 0 0 0 1.18-2.4 3.69 3.69 0 0 1-2.32-3.36ZM14.95 6.31a3.75 3.75 0 0 0 .86-2.69 3.81 3.81 0 0 0-2.48 1.28 3.56 3.56 0 0 0-.88 2.59 3.17 3.17 0 0 0 2.5-1.18Z" />
                          </svg>
                        </Show>
                      }
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="#4285F4"
                          d="M21.6 12.23c0-.74-.07-1.46-.19-2.15H12v4.07h5.38a4.6 4.6 0 0 1-2 3.02v2.64h3.24c1.9-1.75 2.98-4.33 2.98-7.58Z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.64c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.13H3.07v2.72A10 10 0 0 0 12 22Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M6.41 13.76A6.02 6.02 0 0 1 6.1 12c0-.61.1-1.2.31-1.76V7.52H3.07A10 10 0 0 0 2 12c0 1.61.39 3.14 1.07 4.48l3.34-2.72Z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 6.11c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.93 5.52l3.34 2.72C7.2 7.87 9.4 6.11 12 6.11Z"
                        />
                      </svg>
                    </Show>
                    <span>{state.texts().continueWith(provider)}</span>
                    <span aria-hidden="true" />
                  </button>
                )}
              </For>
            </div>
            <p class="mobile-switch">
              {state.mode() === "register" ? state.texts().hasAccount : state.texts().noAccount}{" "}
              <button
                class="text-button"
                type="button"
                onClick={() => state.changeMode(state.mode() === "login" ? "register" : "login")}
              >
                {state.mode() === "register" ? state.texts().signIn : state.texts().signUp}
              </button>
            </p>
          </section>
        </main>
        <footer class="site-footer">
          <span>© 2025 adaptive-solid-ui</span>
          <a href="#authTitle">{state.texts().privacy}</a>
          <a href="#authTitle">{state.texts().legal}</a>
          <a href="#authTitle">{state.texts().help}</a>
        </footer>
      </div>
      <dialog
        ref={state.setDialog}
        aria-labelledby="resetTitle"
        onKeyDown={(e) => {
          if (e.key === "Escape") state.closeReset()
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect()
            if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
              state.closeReset()
          }
        }}
      >
        <form class="dialog-content" novalidate onSubmit={state.submitReset} onInput={state.clearResetError}>
          <div class="dialog-head">
            <div>
              <h2 id="resetTitle">{state.texts().reset}</h2>
              <p>{state.texts().resetDescription}</p>
            </div>
            <button
              class="dialog-close"
              type="button"
              aria-label={state.texts().closeDialog}
              onClick={state.closeReset}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="field">
            <label for="resetEmail">{state.texts().email}</label>
            <Input
              ref={state.setResetEmail}
              id="resetEmail"
              name="resetEmail"
              type="email"
              autocomplete="email"
              placeholder={state.texts().emailPlaceholder}
              required
              aria-invalid={state.resetErrors().resetEmail ? "true" : undefined}
              aria-describedby={state.resetErrors().resetEmail ? "resetEmailError" : undefined}
            />
            <FieldError id="resetEmailError" message={state.resetErrors().resetEmail} />
          </div>
          <div class="dialog-actions">
            <button class="secondary-button" type="button" onClick={state.closeReset}>
              {state.texts().cancel}
            </button>
            <Button class="primary-button" type="submit">
              {state.texts().sendLink}
            </Button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
