import { demoGetTextValue } from "#src/demos/input/demoGetTextValue.jsx"
import { SwitchSingle } from "#ui/input/switch/SwitchSingle.jsx"
import { PageWrapper } from "#ui/static/page/PageWrapper.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { arrCreate } from "#utils/arr/arrCreate.js"

const options100 = arrCreate<string>(100, (i) => "" + i)
const singleValueSignal = createSignalObject<string>("")

export function DemoSwitchSingle() {
  return (
    <PageWrapper>
      <SwitchSingle valueSignal={singleValueSignal} getOptions={() => options100} valueText={demoGetTextValue} />
    </PageWrapper>
  )
}
