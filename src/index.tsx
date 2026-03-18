/* @refresh reload */

import { demoList } from "#/app/demos/demoList"
import { NavDemo } from "#/nav/NavDemo"
import { generateDemoRoutes } from "#ui/demo_pages/generateDemoRoutes"
import { Router } from "@solidjs/router"
import { render } from "solid-js/web"
import "./tailwind.css"

const root = document.getElementById("root")

const demoRoutesDef = [
  {
    // path: "/*",
    // component: LayoutWrapperDemo,
    children: generateDemoRoutes(demoList, "", NavDemo),
  },
]

// @ts-ignore
render(() => <Router>{demoRoutesDef}</Router>, root!)
