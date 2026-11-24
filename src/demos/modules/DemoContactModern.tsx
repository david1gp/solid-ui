import { mdiAccount } from "@adaptive-ds/mdi/mdiAccount.js"
import { mdiEmail } from "@adaptive-ds/mdi/mdiEmail.js"
import { mdiMessage } from "@adaptive-ds/mdi/mdiMessage.js"
import { mdiTag } from "@adaptive-ds/mdi/mdiTag.js"
import { Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { contactMessageLimits } from "./contact/contactMessageLimits.js"
import { contactModernStateCreate } from "./contactModern/contactModernStateCreate.js"
import { FieldError } from "./FieldError.jsx"
import "./contactModern/DemoContactModern.css"

export function DemoContactModern() {
  const state = contactModernStateCreate()
  return (
    <main class="contact-modern" classList={{ "contact-modern-sent": state.sent() }}>
      <div class="contact-modern-glow contact-modern-glow-warm" />
      <div class="contact-modern-glow contact-modern-glow-cool" />
      <section class="contact-modern-intro">
        <h1>{state.texts().headline}</h1>
        <p>{state.texts().intro}</p>
      </section>
      <section class="contact-modern-panel" aria-labelledby="modern-contact-title">
        <div class="contact-modern-languages" role="group" aria-label={state.texts().language}>
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
        <div class="contact-modern-content">
          <Show
            when={state.sent()}
            fallback={
              <>
                <h2 id="modern-contact-title">{state.texts().title}</h2>
                <form
                  ref={state.setForm}
                  novalidate
                  aria-busy={state.loading() ? "true" : "false"}
                  onSubmit={state.submit}
                  onInput={state.clearError}
                  onChange={state.clearError}
                >
                  <div class="contact-modern-field">
                    <label class="contact-modern-sr" for="modern-name">
                      {state.texts().name}
                    </label>
                    <div class="contact-modern-input">
                      <input
                        id="modern-name"
                        name="name"
                        autocomplete="name"
                        maxlength={100}
                        required
                        placeholder={state.texts().name}
                        aria-invalid={state.errors().name ? "true" : undefined}
                        aria-describedby={state.errors().name ? "modern-name-error" : undefined}
                      />
                      <Icon path={mdiAccount} />
                    </div>
                    <FieldError id="modern-name-error" message={state.errors().name} />
                  </div>
                  <div class="contact-modern-field">
                    <label class="contact-modern-sr" for="modern-email">
                      {state.texts().email}
                    </label>
                    <div class="contact-modern-input">
                      <input
                        id="modern-email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        placeholder={state.texts().email}
                        aria-invalid={state.errors().email ? "true" : undefined}
                        aria-describedby={state.errors().email ? "modern-email-error" : undefined}
                      />
                      <Icon path={mdiEmail} />
                    </div>
                    <FieldError id="modern-email-error" message={state.errors().email} />
                  </div>
                  <div class="contact-modern-field">
                    <label class="contact-modern-sr" for="modern-subject">
                      {state.texts().subject}
                    </label>
                    <div class="contact-modern-input">
                      <input id="modern-subject" name="subject" maxlength={100} placeholder={state.texts().subject} />
                      <Icon path={mdiTag} />
                    </div>
                  </div>
                  <div class="contact-modern-field">
                    <label class="contact-modern-sr" for="modern-message">
                      {state.texts().message}
                    </label>
                    <div class="contact-modern-input">
                      <textarea
                        id="modern-message"
                        name="message"
                        rows={2}
                        minlength={contactMessageLimits.min}
                        maxlength={contactMessageLimits.max}
                        required
                        placeholder={state.texts().message}
                        onInput={state.resizeMessage}
                        aria-invalid={state.errors().message ? "true" : undefined}
                        aria-describedby={state.errors().message ? "modern-message-error" : undefined}
                      />
                      <Icon path={mdiMessage} />
                    </div>
                    <FieldError id="modern-message-error" message={state.errors().message} />
                  </div>
                  <div class="contact-modern-consent">
                    <label>
                      <input
                        name="consent"
                        type="checkbox"
                        required
                        aria-invalid={state.errors().consent ? "true" : undefined}
                        aria-describedby={state.errors().consent ? "modern-consent-error" : undefined}
                      />
                      <span>
                        {state.texts().consent}
                        <strong>{state.texts().privacy}</strong>
                        {state.texts().consentSuffix}
                      </span>
                    </label>
                    <FieldError id="modern-consent-error" message={state.errors().consent} />
                  </div>
                  <div class="contact-modern-actions">
                    <button type="submit" disabled={state.loading()}>
                      {state.loading() ? state.texts().sending : state.texts().send} <span aria-hidden="true">→</span>
                    </button>
                    <a href="tel:+49301234567">{state.texts().call}</a>
                  </div>
                </form>
              </>
            }
          >
            <div role="status">
              <h2
                id="modern-contact-title"
                tabindex={-1}
                ref={(element) => {
                  queueMicrotask(() => {
                    if (!element.isConnected) return
                    if (window.matchMedia("(max-width: 767px)").matches) window.scrollTo(0, 0)
                    element.focus({ preventScroll: true })
                  })
                }}
              >
                {state.texts().success}
              </h2>
              <p>{state.texts().successText}</p>
              <button class="contact-modern-again" type="button" onClick={state.sendAnother}>
                {state.texts().another} →
              </button>
            </div>
          </Show>
        </div>
      </section>
    </main>
  )
}
