import { demoGetTextValue } from "#src/demos/input/demoGetTextValue.jsx"
import { SelectMultiple } from "#ui/input/select/SelectMultiple.jsx"
import { PageWrapper } from "#ui/static/page/PageWrapper.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { arrCreate } from "#utils/arr/arrCreate.js"

const options100Strings = arrCreate<string>(100, (i) => "" + i)
const multiValueSignal = createSignalObject<string[]>([])

export function DemoSelectMultiple() {
  return (
    <PageWrapper>
      <SelectMultiple
        id="DemoMultiSelect"
        valueSignal={multiValueSignal}
        getOptions={() => options100Strings}
        buttonProps={{}}
        valueText={demoGetTextValue}
      />
    </PageWrapper>
  )
}
