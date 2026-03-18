import { CodeBlock } from "#ui/static/code/CodeBlock"

export function DemoCodeBlock() {
  return (
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">CodeBlock Demo</h1>
      <div class="space-y-8">
        <BasicCodeBlockDemo />
        <CodeBlockWithJsonDemo />
        <CodeBlockWithCustomClassDemo />
      </div>
    </div>
  )
}

function BasicCodeBlockDemo() {
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">Basic CodeBlock</h2>
      <CodeBlock>{`function hello() {
  console.log("Hello, World!")
}`}</CodeBlock>
    </div>
  )
}

function CodeBlockWithJsonDemo() {
  const data = { name: "John", age: 30, city: "New York" }
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">JSON Example</h2>
      <CodeBlock>{JSON.stringify(data, null, 2)}</CodeBlock>
    </div>
  )
}

function CodeBlockWithCustomClassDemo() {
  const data = { name: "Jane", age: 25 }
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">With Custom Class Override</h2>
      <CodeBlock class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
        {JSON.stringify(data, null, 2)}
      </CodeBlock>
    </div>
  )
}
