import { Input } from "#ui/input/input/Input.jsx"
import { Button } from "#ui/interactive/button/Button.jsx"
import type { demoRegisterLoginStateCreate } from "../demoRegisterLoginStateCreate.js"
import { FieldError } from "../FieldError.jsx"

export function RegisterLoginResetDialog(props: { state: ReturnType<typeof demoRegisterLoginStateCreate> }) {
  const state = props.state
  return (
    <dialog
      ref={state.setDialog}
      aria-labelledby="resetTitle"
      onKeyDown={(e) => {
        if (e.key === "Escape") state.closeReset()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect()
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) state.closeReset()
        }
      }}
    >
      <form class="dialog-content" novalidate onSubmit={state.submitReset} onInput={state.clearResetError}>
        <div class="dialog-head">
          <div>
            <h2 id="resetTitle">{state.texts().reset}</h2>
            <p>{state.texts().resetDescription}</p>
          </div>
          <button class="dialog-close" type="button" aria-label={state.texts().closeDialog} onClick={state.closeReset}>
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
  )
}
