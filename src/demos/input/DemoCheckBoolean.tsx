import { CheckBoolean } from "#ui/input/check/CheckBoolean.jsx"
import { CheckBooleanSingle } from "#ui/input/check/CheckBooleanSingle.jsx"
import { PageWrapper } from "#ui/static/page/PageWrapper.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

const booleanValueSignal = createSignalObject<boolean>(false)
const booleanBothValueSignal = createSignalObject<boolean>(false)

export function DemoCheckBoolean() {
  return (
    <PageWrapper>
      <div class="space-y-6">
        <CheckBooleanSingle
          id="DemoBooleanCheck"
          valueSignal={booleanValueSignal}
          valueText={(value) => (value ? "Enabled" : "Disabled")}
          class="max-w-sm"
          optionClass="bg-gray-50"
        />

        <CheckBoolean
          id="DemoBooleanBothCheck"
          valueSignal={booleanBothValueSignal}
          valueText={(value) => (value ? "Enabled" : "Disabled")}
          class="max-w-sm"
          optionClass="bg-gray-50"
        />
      </div>
    </PageWrapper>
  )
}
