import { lazy } from "solid-js"
import { type DemoListType } from "#ui/generate_demo_list/DemoListType.js"

const DemoTablePagination2 = lazy(async () => {
  const c = await import("#src/demos/table/DemoTablePagination2.jsx")
  return { default: c.DemoTablePagination2 }
})

const DemoTable2R = lazy(async () => {
  const c = await import("#src/demos/table/DemoTable2R.jsx")
  return { default: c.DemoTable2R }
})

const DemoTable1R = lazy(async () => {
  const c = await import("#src/demos/table/DemoTable1R.jsx")
  return { default: c.DemoTable1R }
})

const DemoTablePagination = lazy(async () => {
  const c = await import("#src/demos/table/DemoTablePagination.jsx")
  return { default: c.DemoTablePagination }
})

const DemoCheckSingle = lazy(async () => {
  const c = await import("#src/demos/input/DemoCheckSingle.jsx")
  return { default: c.DemoCheckSingle }
})

const DemoSwitchSingle = lazy(async () => {
  const c = await import("#src/demos/input/DemoSwitchSingle.jsx")
  return { default: c.DemoSwitchSingle }
})

const DemoCheckBoolean = lazy(async () => {
  const c = await import("#src/demos/input/DemoCheckBoolean.jsx")
  return { default: c.DemoCheckBoolean }
})

const DemoInputS = lazy(async () => {
  const c = await import("#src/demos/input/DemoInputS.jsx")
  return { default: c.DemoInputS }
})

const DemoNumberInput = lazy(async () => {
  const c = await import("#src/demos/input/DemoNumberInput.jsx")
  return { default: c.DemoNumberInput }
})

const DemoSelectSingleNative = lazy(async () => {
  const c = await import("#src/demos/input/DemoSelectSingleNative.jsx")
  return { default: c.DemoSelectSingleNative }
})

const DemoCheckMultiple = lazy(async () => {
  const c = await import("#src/demos/input/DemoCheckMultiple.jsx")
  return { default: c.DemoCheckMultiple }
})

const DemoCheckbox = lazy(async () => {
  const c = await import("#src/demos/input/DemoCheckbox.jsx")
  return { default: c.DemoCheckbox }
})

const DemoInputDatalist = lazy(async () => {
  const c = await import("#src/demos/input/DemoInputDatalist.jsx")
  return { default: c.DemoInputDatalist }
})

const DemoSelectMultiple = lazy(async () => {
  const c = await import("#src/demos/input/DemoSelectMultiple.jsx")
  return { default: c.DemoSelectMultiple }
})

const DemoStyles = lazy(async () => {
  const c = await import("#src/demos/static/DemoStyles.jsx")
  return { default: c.DemoStyles }
})

const DemoCodeBlock = lazy(async () => {
  const c = await import("#src/demos/static/DemoCodeBlock.jsx")
  return { default: c.DemoCodeBlock }
})

const DemoIcons = lazy(async () => {
  const c = await import("#src/demos/static/DemoIcons.jsx")
  return { default: c.DemoIcons }
})

const DemoBadge = lazy(async () => {
  const c = await import("#src/demos/static/DemoBadge.jsx")
  return { default: c.DemoBadge }
})

const DemoCard = lazy(async () => {
  const c = await import("#src/demos/static/DemoCard.jsx")
  return { default: c.DemoCard }
})

const DemoSeparators = lazy(async () => {
  const c = await import("#src/demos/static/DemoSeparators.jsx")
  return { default: c.DemoSeparators }
})

const DemoLoaders = lazy(async () => {
  const c = await import("#src/demos/static/DemoLoaders.jsx")
  return { default: c.DemoLoaders }
})

const DemoTimeline = lazy(async () => {
  const c = await import("#src/demos/static/DemoTimeline.jsx")
  return { default: c.DemoTimeline }
})

const DemoBadges = lazy(async () => {
  const c = await import("#src/demos/static/DemoBadges.jsx")
  return { default: c.DemoBadges }
})

const DemoFeatureGridSection = lazy(async () => {
  const c = await import("#src/demos/composite/DemoFeatureGridSection.jsx")
  return { default: c.DemoFeatureGridSection }
})

const DemoSearchBox = lazy(async () => {
  const c = await import("#src/demos/composite/DemoSearchBox.jsx")
  return { default: c.DemoSearchBox }
})

const DemoCookieBanner = lazy(async () => {
  const c = await import("#src/demos/composite/DemoCookieBanner.jsx")
  return { default: c.DemoCookieBanner }
})

const DemoToaster = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoToaster.jsx")
  return { default: c.DemoToaster }
})

const DemoTabs = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoTabs.jsx")
  return { default: c.DemoTabs }
})

const DemoLinks = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoLinks.jsx")
  return { default: c.DemoLinks }
})

const DemoToggle = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoToggle.jsx")
  return { default: c.DemoToggle }
})

const DemoTheme = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoTheme.jsx")
  return { default: c.DemoTheme }
})

const DemoDetailsDialog = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoDetailsDialog.jsx")
  return { default: c.DemoDetailsDialog }
})

const DemoDetails = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoDetails.jsx")
  return { default: c.DemoDetails }
})

const DemoSidebar = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoSidebar.jsx")
  return { default: c.DemoSidebar }
})

const DemoDialog = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoDialog.jsx")
  return { default: c.DemoDialog }
})

const DemoButtons = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoButtons.jsx")
  return { default: c.DemoButtons }
})

const DemoPopover = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoPopover.jsx")
  return { default: c.DemoPopover }
})

const DemoLists = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoLists.jsx")
  return { default: c.DemoLists }
})

export const demoList = {
  composite: {
    DemoFeatureGridSection: DemoFeatureGridSection,
    DemoSearchBox: DemoSearchBox,
    DemoCookieBanner: DemoCookieBanner,
  },
  input: {
    DemoCheckSingle: DemoCheckSingle,
    DemoSwitchSingle: DemoSwitchSingle,
    DemoCheckBoolean: DemoCheckBoolean,
    DemoInputS: DemoInputS,
    DemoNumberInput: DemoNumberInput,
    DemoSelectSingleNative: DemoSelectSingleNative,
    DemoCheckMultiple: DemoCheckMultiple,
    DemoCheckbox: DemoCheckbox,
    DemoInputDatalist: DemoInputDatalist,
    DemoSelectMultiple: DemoSelectMultiple,
  },
  interactive: {
    DemoToaster: DemoToaster,
    DemoTabs: DemoTabs,
    DemoLinks: DemoLinks,
    DemoToggle: DemoToggle,
    DemoTheme: DemoTheme,
    DemoDetailsDialog: DemoDetailsDialog,
    DemoDetails: DemoDetails,
    DemoSidebar: DemoSidebar,
    DemoDialog: DemoDialog,
    DemoButtons: DemoButtons,
    DemoPopover: DemoPopover,
    DemoLists: DemoLists,
  },
  static: {
    DemoStyles: DemoStyles,
    DemoCodeBlock: DemoCodeBlock,
    DemoIcons: DemoIcons,
    DemoBadge: DemoBadge,
    DemoCard: DemoCard,
    DemoSeparators: DemoSeparators,
    DemoLoaders: DemoLoaders,
    DemoTimeline: DemoTimeline,
    DemoBadges: DemoBadges,
  },
  table: {
    DemoTablePagination2: DemoTablePagination2,
    DemoTable2R: DemoTable2R,
    DemoTable1R: DemoTable1R,
    DemoTablePagination: DemoTablePagination,
  },
} as const satisfies DemoListType
