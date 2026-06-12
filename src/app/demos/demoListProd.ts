import { demoList } from "#src/app/demos/demoList.js"
import { isProdEnv } from "#ui/env/isProdEnv.js"

// `learning_solid` demos depend on @solidjs/router internals and are dev-only.
export const demoListProd = isProdEnv() ? (({ learning_solid: _, ...rest }) => rest)(demoList) : demoList
