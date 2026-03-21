import { generateDemoList } from "#ui/generate_demo_list/generateDemoList.js"

const searchDir = "src/demos"
const outputFile = "src/app/demos/demoList.ts"

await generateDemoList(searchDir, outputFile)
