import { mdiChevronLeft } from "@adaptive-ds/mdi/mdiChevronLeft.js"
import { mdiChevronRight } from "@adaptive-ds/mdi/mdiChevronRight.js"
import { ButtonIcon } from "#ui/interactive/button/ButtonIcon.jsx"
import { buttonVariant } from "#ui/interactive/button/buttonCva.js"
import { demoTablePagination2StateCreate } from "./demoTablePagination2StateCreate.js"
import { tablePagination2TextDefault as texts } from "./TablePagination2Text.js"

export function DemoTablePagination2() {
  const state = demoTablePagination2StateCreate()
  return (
    <div class="flex flex-wrap justify-center md:justify-between py-1 pl-3 gap-2">
      <p class="flex flex-wrap gap-1 my-auto mx-1 text-gray-700 dark:text-neutral-300" aria-live="polite">
        {texts.page} <b>{state.page()}</b> / <b>{state.pageCount}</b>
      </p>
      <div class="flex flex-wrap gap-1 mx-1">
        <ButtonIcon
          icon={mdiChevronLeft}
          iconClass="mr-0.5"
          variant={buttonVariant.subtle}
          disabled={state.page() <= 1}
          onClick={state.decrementPage}
          title={texts.previousPageWithShortcut}
        >
          {texts.previousPage}
        </ButtonIcon>
        <ButtonIcon
          iconRight={mdiChevronRight}
          iconClass="ml-0.5"
          variant={buttonVariant.subtle}
          disabled={state.page() >= state.pageCount}
          onClick={state.incrementPage}
          title={texts.nextPageWithShortcut}
        >
          {texts.nextPage}
        </ButtonIcon>
      </div>
    </div>
  )
}
