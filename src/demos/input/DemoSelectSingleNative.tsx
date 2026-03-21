import { demoGetTextValue } from "#src/demos/input/demoGetTextValue.jsx"
import { SelectSingleNative } from "#ui/input/select/SelectSingleNative.jsx"
import { PageWrapper } from "#ui/static/page/PageWrapper.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { arrCreate } from "#utils/arr/arrCreate.js"
import { createMemo, type Accessor } from "solid-js"

const options100 = arrCreate<string>(100, (i) => "" + i)
const singleValueSignal = createSignalObject<string>("")

export function DemoSelectSingleNative() {
  const getOptions: Accessor<string[]> = createMemo(() => options100)
  const valueText = (value: string) => `Option ${value}`

  return (
    <PageWrapper>
      <SelectSingleNative valueSignal={singleValueSignal} getOptions={getOptions} valueText={demoGetTextValue} />
    </PageWrapper>
  )
}
