import { demoGetTextValue } from "#src/demos/input/demoGetTextValue.jsx"
import { CheckSingle } from "#ui/input/check/CheckSingle.jsx"
import { PageWrapper } from "#ui/static/page/PageWrapper.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { arrCreate } from "#utils/arr/arrCreate.js"

const options10Strings = arrCreate<string>(10, (i) => `${i}`)
const singleValueSignal = createSignalObject<string>("")

export function DemoCheckSingle() {
  return (
    <PageWrapper>
      <CheckSingle
        id="DemoSingleCheck"
        valueSignal={singleValueSignal}
        getOptions={() => options10Strings}
        valueText={demoGetTextValue}
        // valueTextSubtitle={demoGetSubtitleValue}
      />
    </PageWrapper>
  )
}
