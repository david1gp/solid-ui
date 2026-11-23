import { For, Show } from "solid-js"
import { Input } from "#ui/input/input/Input.jsx"
import { Textarea } from "#ui/input/textarea/Textarea.jsx"
import { Button } from "#ui/interactive/button/Button.jsx"
import { LogoImageText } from "#ui/static/logo/LogoImageText.jsx"
import { contactMessageLimits } from "./contact/contactMessageLimits.js"
import { contactStateCreate } from "./contact/contactStateCreate.js"
import { FieldError } from "./FieldError.jsx"
import "./contact/DemoContact.css"

const topics = ["general", "support", "sales", "feedback"] as const

/** Contact form template in the visual language of the register/login demo. */
export function DemoContact() {
  const state = contactStateCreate()
  const topicLabel = (topic: (typeof topics)[number]) => {
    const t = state.texts()
    if (topic === "support") return t.topicSupport
    if (topic === "sales") return t.topicSales
    if (topic === "feedback") return t.topicFeedback
    return t.topicGeneral
  }
  const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined
  return (
    <div class="contact-demo">
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
          <section class="contact-container" aria-labelledby="contactTitle">
            <Show
              when={state.sent()}
              fallback={
                <>
                  <div class="contact-heading">
                    <h1 id="contactTitle">{state.texts().title}</h1>
                    <p>{state.texts().description}</p>
                  </div>
                  <form
                    ref={state.setForm}
                    class="form-stack"
                    id="contactForm"
                    novalidate
                    aria-busy={state.loading() ? "true" : "false"}
                    onSubmit={state.submit}
                    onInput={state.clearError}
                    onChange={state.clearError}
                  >
                    <fieldset class="topic-group">
                      <legend class="field-label">{state.texts().topic}</legend>
                      <div class="topic-options">
                        <For each={topics}>
                          {(topic) => (
                            <label class="topic-option">
                              <input type="radio" name="topic" value={topic} checked={topic === "general"} />
                              <span>{topicLabel(topic)}</span>
                            </label>
                          )}
                        </For>
                      </div>
                    </fieldset>
                    <div class="field">
                      <label for="contactName">{state.texts().name}</label>
                      <Input
                        id="contactName"
                        name="name"
                        type="text"
                        autocomplete="name"
                        placeholder={state.texts().namePlaceholder}
                        maxlength={100}
                        required
                        aria-invalid={state.errors().name ? "true" : undefined}
                        aria-describedby={state.errors().name ? "contactNameError" : undefined}
                      />
                      <FieldError id="contactNameError" message={state.errors().name} />
                    </div>
                    <div class="field">
                      <label for="contactEmail">{state.texts().email}</label>
                      <Input
                        id="contactEmail"
                        name="email"
                        type="email"
                        autocomplete="email"
                        inputmode="email"
                        spellcheck={false}
                        placeholder={state.texts().emailPlaceholder}
                        required
                        aria-invalid={state.errors().email ? "true" : undefined}
                        aria-describedby={state.errors().email ? "contactEmailError" : undefined}
                      />
                      <FieldError id="contactEmailError" message={state.errors().email} />
                    </div>
                    <div class="field-row">
                      <div class="field">
                        <label for="contactCompany">
                          {state.texts().company} <span class="optional">({state.texts().optional})</span>
                        </label>
                        <Input
                          id="contactCompany"
                          name="company"
                          type="text"
                          autocomplete="organization"
                          placeholder={state.texts().companyPlaceholder}
                          maxlength={100}
                        />
                      </div>
                      <div class="field">
                        <label for="contactPhone">
                          {state.texts().phone} <span class="optional">({state.texts().optional})</span>
                        </label>
                        <Input
                          id="contactPhone"
                          name="phone"
                          type="tel"
                          autocomplete="tel"
                          inputmode="tel"
                          pattern="[\d +\(\)\/\-]{6,25}"
                          placeholder={state.texts().phonePlaceholder}
                          aria-invalid={state.errors().phone ? "true" : undefined}
                          aria-describedby={state.errors().phone ? "contactPhoneError" : undefined}
                        />
                        <FieldError id="contactPhoneError" message={state.errors().phone} />
                      </div>
                    </div>
                    <div class="field">
                      <label for="contactMessage">{state.texts().message}</label>
                      <Textarea
                        id="contactMessage"
                        name="message"
                        rows={5}
                        placeholder={state.texts().messagePlaceholder}
                        minlength={contactMessageLimits.min}
                        maxlength={contactMessageLimits.max}
                        required
                        aria-invalid={state.errors().message ? "true" : undefined}
                        aria-describedby={describedBy(
                          state.errors().message && "contactMessageError",
                          "contactMessageHint",
                        )}
                        onInput={(e) => state.messageInput(e.currentTarget.value)}
                      />
                      <FieldError id="contactMessageError" message={state.errors().message} />
                      <div class="message-meta">
                        <span id="contactMessageHint">{state.texts().messageHint(contactMessageLimits.min)}</span>
                        <span
                          class={["counter", { "near-limit": state.messageLength() > contactMessageLimits.max * 0.9 }]}
                        >
                          <span aria-hidden="true">
                            {state.messageLength()} / {contactMessageLimits.max}
                          </span>
                          <span class="sr-only">
                            {state.texts().characters(state.messageLength(), contactMessageLimits.max)}
                          </span>
                        </span>
                      </div>
                    </div>
                    {/* Honeypot against spam bots: invisible for humans and assistive technology. */}
                    <div class="honeypot" aria-hidden="true">
                      <label for="contactWebsite">{state.texts().honeypot}</label>
                      <input id="contactWebsite" name="website" type="text" tabindex={-1} autocomplete="off" />
                    </div>
                    <div class="field">
                      <label class="checkbox-label">
                        <input
                          type="checkbox"
                          name="consent"
                          required
                          aria-invalid={state.errors().consent ? "true" : undefined}
                          aria-describedby={state.errors().consent ? "contactConsentError" : undefined}
                        />
                        <span class="checkbox" aria-hidden="true">
                          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="m2.2 6.2 2.3 2.2 5.2-5" stroke="currentColor" stroke-width="1.8" />
                          </svg>
                        </span>
                        <span>
                          {state.texts().consentPrefix}
                          <a href="#contactTitle">{state.texts().privacyPolicy}</a>.
                        </span>
                      </label>
                      <FieldError id="contactConsentError" message={state.errors().consent} />
                    </div>
                    <Button
                      class={`primary-button${state.loading() ? " loading" : ""}`}
                      type="submit"
                      disabled={state.loading()}
                    >
                      <span class="spinner" aria-hidden="true" />
                      <span>{state.loading() ? state.texts().sending : state.texts().send}</span>
                      <Show when={!state.loading()}>
                        <svg class="send-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M5 12h13M13 6l6 6-6 6"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Show>
                    </Button>
                  </form>
                  <div class="divider">
                    <span>{state.texts().orDirect}</span>
                  </div>
                  <div class="direct-links">
                    <a class="direct-link" href="mailto:hello@adaptive-solid-ui.dev">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.7" />
                        <path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
                      </svg>
                      <span class="direct-text">
                        <span class="direct-title">{state.texts().emailUs}</span>
                        <span class="direct-sub">hello@adaptive-solid-ui.dev</span>
                      </span>
                    </a>
                    <a class="direct-link" href="tel:+49301234567">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M6.6 3.5h2.6l1.4 4.2-2 1.4a12 12 0 0 0 6.3 6.3l1.4-2 4.2 1.4v2.6a2.1 2.1 0 0 1-2.3 2.1A16.8 16.8 0 0 1 4.5 5.8a2.1 2.1 0 0 1 2.1-2.3Z"
                          stroke="currentColor"
                          stroke-width="1.7"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span class="direct-text">
                        <span class="direct-title">{state.texts().callUs}</span>
                        <span class="direct-sub">+49 30 1234567 · {state.texts().callHours}</span>
                      </span>
                    </a>
                  </div>
                </>
              }
            >
              {(sent) => (
                <div class="success" role="status">
                  <span class="success-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="m5 12.5 4.5 4.5L19 7.5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <h1 id="contactTitle" ref={state.setSuccessHeading} tabindex={-1}>
                    {state.texts().successTitle}
                  </h1>
                  <p>{state.texts().successText(sent().name, sent().email)}</p>
                  <button class="secondary-button" type="button" onClick={state.sendAnother}>
                    {state.texts().sendAnother}
                  </button>
                </div>
              )}
            </Show>
          </section>
        </main>
        <footer class="site-footer">
          <span>© 2025 adaptive-solid-ui</span>
          <a href="#contactTitle">{state.texts().privacy}</a>
          <a href="#contactTitle">{state.texts().legal}</a>
          <a href="#contactTitle">{state.texts().help}</a>
        </footer>
      </div>
    </div>
  )
}
