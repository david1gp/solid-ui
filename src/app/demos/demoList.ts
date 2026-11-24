import { lazy } from "solid-js"
import type { DemoListType } from "#ui/generate_demo_list/DemoListType.js"

const DemoTimeline = lazy(async () => {
  const c = await import("#src/demos/static/DemoTimeline.jsx")
  return { default: c.DemoTimeline }
})

const DemoSeparators = lazy(async () => {
  const c = await import("#src/demos/static/DemoSeparators.jsx")
  return { default: c.DemoSeparators }
})

const DemoLoaders = lazy(async () => {
  const c = await import("#src/demos/static/DemoLoaders.jsx")
  return { default: c.DemoLoaders }
})

const DemoBadge = lazy(async () => {
  const c = await import("#src/demos/static/DemoBadge.jsx")
  return { default: c.DemoBadge }
})

const DemoStyles = lazy(async () => {
  const c = await import("#src/demos/static/DemoStyles.jsx")
  return { default: c.DemoStyles }
})

const DemoIcons = lazy(async () => {
  const c = await import("#src/demos/static/DemoIcons.jsx")
  return { default: c.DemoIcons }
})

const DemoBadges = lazy(async () => {
  const c = await import("#src/demos/static/DemoBadges.jsx")
  return { default: c.DemoBadges }
})

const DemoCodeBlock = lazy(async () => {
  const c = await import("#src/demos/static/DemoCodeBlock.jsx")
  return { default: c.DemoCodeBlock }
})

const DemoCard = lazy(async () => {
  const c = await import("#src/demos/static/DemoCard.jsx")
  return { default: c.DemoCard }
})

const DemoRegisterLogin = lazy(async () => {
  const c = await import("#src/demos/modules/DemoRegisterLogin.jsx")
  return { default: c.DemoRegisterLogin }
})

const ContactModern = lazy(async () => {
  const c = await import("#src/demos/modules/DemoContactModern.jsx")
  return { default: c.DemoContactModern }
})
const DemoContact = lazy(async () => {
  const c = await import("#src/demos/modules/DemoContact.jsx")
  return { default: c.DemoContact }
})

const DemoNavbarHeaderModern = lazy(async () => {
  const c = await import("#src/demos/modules/DemoNavbarHeaderModern.jsx")
  return { default: c.DemoNavbarHeaderModern }
})

const DemoBottomMobileNavbar = lazy(async () => {
  const c = await import("#src/demos/modules/DemoBottomMobileNavbar.jsx")
  return { default: c.DemoBottomMobileNavbar }
})

const DemoFooterSimple = lazy(async () => {
  const c = await import("#src/demos/modules/DemoFooterSimple.jsx")
  return { default: c.DemoFooterSimple }
})

const DemoRegisterCi = lazy(async () => {
  const c = await import("#src/demos/modules/DemoRegisterCi.jsx")
  return { default: c.DemoRegisterCi }
})

const DemoSidebarModern = lazy(async () => {
  const c = await import("#src/demos/modules/DemoSidebarModern.jsx")
  return { default: c.DemoSidebarModern }
})

const DemoAppSidebar = lazy(async () => {
  const c = await import("#src/demos/modules/DemoAppSidebar.jsx")
  return { default: c.DemoAppSidebar }
})

const DemoCMS = lazy(async () => {
  const c = await import("#src/demos/modules/DemoCMS.jsx")
  return { default: c.DemoCMS }
})

const DemoNavHeader = lazy(async () => {
  const c = await import("#src/demos/modules/DemoNavHeader.jsx")
  return { default: c.DemoNavHeader }
})

const DemoDetails = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoDetails.jsx")
  return { default: c.DemoDetails }
})

const DemoToaster = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoToaster.jsx")
  return { default: c.DemoToaster }
})

const DemoToggle = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoToggle.jsx")
  return { default: c.DemoToggle }
})

const DemoTheme = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoTheme.jsx")
  return { default: c.DemoTheme }
})

const DemoButtons = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoButtons.jsx")
  return { default: c.DemoButtons }
})

const DemoTabs = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoTabs.jsx")
  return { default: c.DemoTabs }
})

const DemoLinks = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoLinks.jsx")
  return { default: c.DemoLinks }
})

const DemoPopover = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoPopover.jsx")
  return { default: c.DemoPopover }
})

const DemoLists = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoLists.jsx")
  return { default: c.DemoLists }
})

const DemoDetailsDialog = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoDetailsDialog.jsx")
  return { default: c.DemoDetailsDialog }
})

const DemoDialog = lazy(async () => {
  const c = await import("#src/demos/interactive/DemoDialog.jsx")
  return { default: c.DemoDialog }
})

const DemoCookieBanner = lazy(async () => {
  const c = await import("#src/demos/composite/DemoCookieBanner.jsx")
  return { default: c.DemoCookieBanner }
})

const DemoFeatureGridSection = lazy(async () => {
  const c = await import("#src/demos/composite/DemoFeatureGridSection.jsx")
  return { default: c.DemoFeatureGridSection }
})

const DemoSearchBox = lazy(async () => {
  const c = await import("#src/demos/composite/DemoSearchBox.jsx")
  return { default: c.DemoSearchBox }
})

const DemoTable2R = lazy(async () => {
  const c = await import("#src/demos/table/DemoTable2R.jsx")
  return { default: c.DemoTable2R }
})

const DemoTable1R = lazy(async () => {
  const c = await import("#src/demos/table/DemoTable1R.jsx")
  return { default: c.DemoTable1R }
})

const DemoTablePagination2 = lazy(async () => {
  const c = await import("#src/demos/table/DemoTablePagination2.jsx")
  return { default: c.DemoTablePagination2 }
})

const DemoTablePagination = lazy(async () => {
  const c = await import("#src/demos/table/DemoTablePagination.jsx")
  return { default: c.DemoTablePagination }
})

const DemoSelectMultiple = lazy(async () => {
  const c = await import("#src/demos/input/DemoSelectMultiple.jsx")
  return { default: c.DemoSelectMultiple }
})

const DemoNumberInput = lazy(async () => {
  const c = await import("#src/demos/input/DemoNumberInput.jsx")
  return { default: c.DemoNumberInput }
})

const DemoSelectSingle = lazy(async () => {
  const c = await import("#src/demos/input/DemoSelectSingle.jsx")
  return { default: c.DemoSelectSingle }
})

const DemoCheckMultiple = lazy(async () => {
  const c = await import("#src/demos/input/DemoCheckMultiple.jsx")
  return { default: c.DemoCheckMultiple }
})

const DemoSelectSingleNative = lazy(async () => {
  const c = await import("#src/demos/input/DemoSelectSingleNative.jsx")
  return { default: c.DemoSelectSingleNative }
})

const DemoCheckBoolean = lazy(async () => {
  const c = await import("#src/demos/input/DemoCheckBoolean.jsx")
  return { default: c.DemoCheckBoolean }
})

const DemoInputDatalist = lazy(async () => {
  const c = await import("#src/demos/input/DemoInputDatalist.jsx")
  return { default: c.DemoInputDatalist }
})

const DemoCheckSingle = lazy(async () => {
  const c = await import("#src/demos/input/DemoCheckSingle.jsx")
  return { default: c.DemoCheckSingle }
})

const DemoCheckbox = lazy(async () => {
  const c = await import("#src/demos/input/DemoCheckbox.jsx")
  return { default: c.DemoCheckbox }
})

const DemoSwitchSingle = lazy(async () => {
  const c = await import("#src/demos/input/DemoSwitchSingle.jsx")
  return { default: c.DemoSwitchSingle }
})

const DemoInputS = lazy(async () => {
  const c = await import("#src/demos/input/DemoInputS.jsx")
  return { default: c.DemoInputS }
})

export const demoList = {
  composite: {
    DemoCookieBanner: DemoCookieBanner,
    DemoFeatureGridSection: DemoFeatureGridSection,
    DemoSearchBox: DemoSearchBox,
  },
  input: {
    DemoSelectMultiple: DemoSelectMultiple,
    DemoNumberInput: DemoNumberInput,
    DemoSelectSingle: DemoSelectSingle,
    DemoCheckMultiple: DemoCheckMultiple,
    DemoSelectSingleNative: DemoSelectSingleNative,
    DemoCheckBoolean: DemoCheckBoolean,
    DemoInputDatalist: DemoInputDatalist,
    DemoCheckSingle: DemoCheckSingle,
    DemoCheckbox: DemoCheckbox,
    DemoSwitchSingle: DemoSwitchSingle,
    DemoInputS: DemoInputS,
  },
  interactive: {
    DemoDetails: DemoDetails,
    DemoToaster: DemoToaster,
    DemoToggle: DemoToggle,
    DemoTheme: DemoTheme,
    DemoButtons: DemoButtons,
    DemoTabs: DemoTabs,
    DemoLinks: DemoLinks,
    DemoPopover: DemoPopover,
    DemoLists: DemoLists,
    DemoDetailsDialog: DemoDetailsDialog,
    DemoDialog: DemoDialog,
  },
  modules: {
    "Bottom-Mobile-Navbar": DemoBottomMobileNavbar,
    DemoRegisterLogin: DemoRegisterLogin,
    DemoRegisterCi: DemoRegisterCi,
    DemoContact: DemoContact,
    ContactModern: ContactModern,
    DemoAppSidebar: DemoAppSidebar,
    DemoSidebarModern: DemoSidebarModern,
    DemoCMS: DemoCMS,
    DemoNavHeader: DemoNavHeader,
    "NavbarHeader-Modern": DemoNavbarHeaderModern,
    "Footer-Simple": DemoFooterSimple,
  },
  static: {
    DemoTimeline: DemoTimeline,
    DemoSeparators: DemoSeparators,
    DemoLoaders: DemoLoaders,
    DemoBadge: DemoBadge,
    DemoStyles: DemoStyles,
    DemoIcons: DemoIcons,
    DemoBadges: DemoBadges,
    DemoCodeBlock: DemoCodeBlock,
    DemoCard: DemoCard,
  },
  table: {
    DemoTable2R: DemoTable2R,
    DemoTable1R: DemoTable1R,
    DemoTablePagination2: DemoTablePagination2,
    DemoTablePagination: DemoTablePagination,
  },
} as const satisfies DemoListType
