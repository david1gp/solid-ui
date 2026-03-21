import { demoGetTextValue, demoGetSubtitleValue } from "#src/demos/input/demoGetTextValue.jsx"
import { CheckMultiple } from "#ui/input/check/CheckMultiple.jsx"
import { PageWrapper } from "#ui/static/page/PageWrapper.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { arrCreate } from "#utils/arr/arrCreate.js"

const options10Strings = arrCreate<string>(10, (i) => `${i}`)
const multiValueSignal = createSignalObject<string[]>([])

export function DemoCheckMultiple() {
  return (
    <PageWrapper>
      <CheckMultiple
        id="DemoMultiCheck2"
        valueSignal={multiValueSignal}
        getOptions={() => options10Strings}
        valueText={demoGetTextValue}
        valueTextSubtitle={demoGetSubtitleValue}
      />
    </PageWrapper>
  )
}
