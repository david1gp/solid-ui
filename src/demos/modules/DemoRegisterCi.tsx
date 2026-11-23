import { For, Show } from "solid-js"
import { RegisterCiArtwork } from "./registerCi/RegisterCiArtwork.jsx"
import { RegisterCiFieldError } from "./registerCi/RegisterCiFieldError.jsx"
import { RegisterCiSocialIcon } from "./registerCi/RegisterCiSocialIcon.jsx"
import { registerCiStateCreate } from "./registerCi/registerCiStateCreate.js"
import "./registerCi/DemoRegisterCi.css"

const providers = ["Google", "Apple", "Microsoft"] as const

/** Dark split-screen sign-in / sign-up page with CMS artwork (independent from DemoRegisterLogin). */
export function DemoRegisterCi() {
  const state = registerCiStateCreate()
  return (
    <div class="register-ci">
      <div class="rc-page">
        <div class="rc-window">
          <section class="rc-pane" aria-labelledby="rcAuthTitle">
            <div class="rc-topbar">
              <div class="rc-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              {/* biome-ignore lint/a11y/useSemanticElements: The segmented toggle is specified as an ARIA group. */}
              <div class="rc-lang" role="group" aria-label={state.texts().language}>
                <For each={["de", "en"] as const}>
                  {(lang) => (
                    <button
                      type="button"
                      lang={lang}
                      aria-pressed={state.locale() === lang ? "true" : "false"}
                      onClick={() => state.changeLocale(lang)}
                    >
                      {lang.toUpperCase()}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <div class="rc-body">
              <div class="rc-heading">
                <h1 id="rcAuthTitle">
                  {state.mode() === "register" ? state.texts().createAccount : state.texts().welcome}
                </h1>
                <p>
                  {state.mode() === "register" ? state.texts().registerDescription : state.texts().loginDescription}
                </p>
              </div>

              <div class="rc-tabs" data-active={state.mode()} role="tablist" aria-label={state.texts().accessType}>
                <span class="rc-tab-indicator" aria-hidden="true" />
                <button
                  class="rc-tab"
                  type="button"
                  role="tab"
                  aria-selected={state.mode() === "login" ? "true" : "false"}
                  aria-controls="rcAuthForm"
                  onClick={() => state.changeMode("login")}
                >
                  {state.texts().signIn}
                </button>
                <button
                  class="rc-tab"
                  type="button"
                  role="tab"
                  aria-selected={state.mode() === "register" ? "true" : "false"}
                  aria-controls="rcAuthForm"
                  onClick={() => state.changeMode("register")}
                >
                  {state.texts().signUp}
                </button>
              </div>

              <form
                ref={state.setForm}
                class="rc-form"
                id="rcAuthForm"
                novalidate
                onSubmit={state.submit}
                onInput={state.clearError}
                onChange={state.clearError}
              >
                <Show when={state.mode() === "register"}>
                  <div class="rc-field">
                    <label for="rcName">{state.texts().name}</label>
                    <input
                      class="rc-input"
                      id="rcName"
                      name="name"
                      type="text"
                      autocomplete="name"
                      placeholder={state.texts().namePlaceholder}
                      required
                      aria-invalid={state.errors().name ? "true" : undefined}
                      aria-describedby={state.errors().name ? "rcNameError" : undefined}
                    />
                    <RegisterCiFieldError id="rcNameError" message={state.errors().name} />
                  </div>
                </Show>
                <div class="rc-field">
                  <label for="rcEmail">{state.texts().email}</label>
                  <input
                    class="rc-input"
                    id="rcEmail"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder={state.texts().emailPlaceholder}
                    required
                    aria-invalid={state.errors().email ? "true" : undefined}
                    aria-describedby={state.errors().email ? "rcEmailError" : undefined}
                    onInput={(e) => state.emailInput(e.currentTarget.value)}
                  />
                  <RegisterCiFieldError id="rcEmailError" message={state.errors().email} />
                </div>
                <div class="rc-field">
                  <div class="rc-field-head">
                    <label for="rcPassword">{state.texts().password}</label>
                    <Show when={state.mode() === "login"}>
                      <button class="rc-link" type="button" onClick={state.openReset}>
                        {state.texts().forgot}
                      </button>
                    </Show>
                  </div>
                  <div class="rc-input-wrap">
                    <input
                      class="rc-input"
                      id="rcPassword"
                      name="password"
                      type={state.visible() ? "text" : "password"}
                      autocomplete={state.mode() === "register" ? "new-password" : "current-password"}
                      placeholder={state.texts().passwordPlaceholder}
                      minlength={8}
                      required
                      aria-invalid={state.errors().password ? "true" : undefined}
                      aria-describedby={state.errors().password ? "rcPasswordError" : undefined}
                      onInput={(e) => state.passwordInput(e.currentTarget.value)}
                    />
                    <button
                      class="rc-eye"
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
                  <RegisterCiFieldError id="rcPasswordError" message={state.errors().password} />
                  <Show when={state.mode() === "register"}>
                    <div class="rc-strength" aria-hidden="true">
                      <For each={[0, 1, 2, 3]}>
                        {(index) => (
                          <span
                            class={[
                              "rc-strength-bar",
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
                    <p class="rc-hint">
                      {!state.password()
                        ? state.texts().passwordHint
                        : `${state.texts().strength}: ${state.score() <= 1 ? state.texts().weak : state.score() <= 3 ? state.texts().medium : state.texts().strong}`}
                    </p>
                  </Show>
                </div>
                <Show
                  when={state.mode() === "login"}
                  fallback={
                    <div class="rc-field">
                      <label class="rc-check">
                        <input
                          type="checkbox"
                          name="terms"
                          required
                          aria-invalid={state.errors().terms ? "true" : undefined}
                          aria-describedby={state.errors().terms ? "rcTermsError" : undefined}
                        />
                        <span class="rc-check-box" aria-hidden="true">
                          <svg class="rc-check-mark" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="m2.2 6.2 2.3 2.2 5.2-5" stroke="currentColor" stroke-width="1.8" />
                          </svg>
                        </span>
                        <span>
                          {state.texts().termsPrefix}
                          <a href="#rcAuthTitle">{state.texts().terms}</a>
                          {state.texts().termsAnd}
                          <a href="#rcAuthTitle">{state.texts().privacyPolicy}</a>.
                        </span>
                      </label>
                      <RegisterCiFieldError id="rcTermsError" message={state.errors().terms} />
                    </div>
                  }
                >
                  <label class="rc-check">
                    <input type="checkbox" name="remember" />
                    <span class="rc-check-box" aria-hidden="true">
                      <svg class="rc-check-mark" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="m2.2 6.2 2.3 2.2 5.2-5" stroke="currentColor" stroke-width="1.8" />
                      </svg>
                    </span>
                    <span>{state.texts().remember}</span>
                  </label>
                </Show>
                <button
                  class={`rc-primary${state.loading() ? " loading" : ""}`}
                  type="submit"
                  disabled={state.loading()}
                >
                  <span class="rc-spinner" aria-hidden="true" />
                  <span>{state.mode() === "register" ? state.texts().createAccount : state.texts().signIn}</span>
                </button>
              </form>

              <div class="rc-divider">
                <span>{state.mode() === "register" ? state.texts().orSignUp : state.texts().orSignIn}</span>
              </div>
              <div class="rc-socials">
                <For each={providers}>
                  {(provider) => (
                    <button
                      class="rc-social"
                      type="button"
                      aria-label={state.texts().continueWith(provider)}
                      title={state.texts().continueWith(provider)}
                    >
                      <RegisterCiSocialIcon provider={provider} />
                    </button>
                  )}
                </For>
              </div>
            </div>

            <p class="rc-switch">
              {state.mode() === "register" ? state.texts().hasAccount : state.texts().noAccount}{" "}
              <button
                class="rc-switch-button"
                type="button"
                onClick={() => state.changeMode(state.mode() === "login" ? "register" : "login")}
              >
                {state.mode() === "register" ? state.texts().signIn : state.texts().signUp}
              </button>
            </p>
          </section>

          <RegisterCiArtwork label={state.texts().artworkLabel} />
        </div>

        <footer class="rc-footer">
          <span>{state.texts().footerCopyright}</span>
          <a href="#rcAuthTitle">{state.texts().privacy}</a>
          <a href="#rcAuthTitle">{state.texts().legal}</a>
          <a href="#rcAuthTitle">{state.texts().help}</a>
        </footer>
      </div>

      <dialog
        ref={state.setDialog}
        class="rc-dialog"
        aria-labelledby="rcResetTitle"
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
        <form class="rc-dialog-content" novalidate onSubmit={state.submitReset} onInput={state.clearResetError}>
          <div class="rc-dialog-head">
            <div>
              <h2 id="rcResetTitle">{state.texts().reset}</h2>
              <p>{state.texts().resetDescription}</p>
            </div>
            <button
              class="rc-dialog-close"
              type="button"
              aria-label={state.texts().closeDialog}
              onClick={state.closeReset}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="rc-field">
            <label for="rcResetEmail">{state.texts().email}</label>
            <input
              ref={state.setResetEmail}
              class="rc-input"
              id="rcResetEmail"
              name="resetEmail"
              type="email"
              autocomplete="email"
              placeholder={state.texts().emailPlaceholder}
              required
              aria-invalid={state.resetErrors().resetEmail ? "true" : undefined}
              aria-describedby={state.resetErrors().resetEmail ? "rcResetEmailError" : undefined}
            />
            <RegisterCiFieldError id="rcResetEmailError" message={state.resetErrors().resetEmail} />
          </div>
          <div class="rc-dialog-actions">
            <button class="rc-secondary" type="button" onClick={state.closeReset}>
              {state.texts().cancel}
            </button>
            <button class="rc-primary" type="submit">
              {state.texts().sendLink}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}
