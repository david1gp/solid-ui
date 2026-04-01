/* @refresh reload */

import { demoList } from "#src/app/demos/demoList.js"
import { NavDemo } from "#src/nav/NavDemo.jsx"
import { generateDemoRoutes } from "#ui/demo_pages/generateDemoRoutes.jsx"
import { isProdEnv } from "#ui/env/isProdEnv.js"
import { Router } from "@solidjs/router"
import { render } from "solid-js/web"
import "./tailwind.css"

const root = document.getElementById("root")

const demoListProd = isProdEnv() ? (({ learning_solid: _, ...rest }) => rest)(demoList) : demoList

const demoRoutesDef = [
  {
    // path: "/*",
    // component: LayoutWrapperDemo,
    children: generateDemoRoutes(demoListProd, "", NavDemo),
  },
]

// @ts-ignore
render(() => <Router>{demoRoutesDef}</Router>, root!)
