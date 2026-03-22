# Adaptive Solid UI

A library of reusable UI components for Solid.js projects. Built with TypeScript, Tailwind CSS, and Solid.js. Components are designed to be accessible, customizable, and easy to integrate.

[![npm version](https://badge.fury.io/js/%40adaptive-sm%2Fsolid-ui.svg)](https://badge.fury.io/js/%40adaptive-sm%2Fsolid-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solid.js](https://img.shields.io/badge/Solid.js-1.9.9-blue.svg)](https://www.solidjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.13-blueviolet.svg)](https://tailwindcss.com/)

Quick link

- code - https://github.com/david1gp/astro-ui
- npm - https://www.npmjs.com/package/@adaptive-ds/astro-ui
- component demo - https://adaptive-solid-ui.pages.dev/

## Features

- **Accessible Components**: Built with accessibility in mind, following ARIA standards.
- **TypeScript Support**: Fully typed for better developer experience.
- **Tailwind CSS Integration**: Styled with Tailwind for easy customization.
- **Solid.js Optimized**: Leverages Solid.js reactivity for performant UIs.
- **Modular Design**: Import only the components you need.
- **Dark Mode Ready**: Supports light and dark themes out of the box.

## Installation

You can install the package metadata from npm:

```bash
bun add @adaptive-ds/solid-ui
```

Then download the UI source locally into your project:

```bash
bunx degit https://github.com/david1gp/solid-ui/ui ui
```

This is the recommended setup for two reasons:

1. Some bundlers can end up pulling in duplicate `solid-js` instances when components are imported directly from `node_modules`.
2. Keeping the components local makes them easy to tweak, restyle, and overwrite as your design evolves, in the same spirit as `shadcn/ui`.

Ensure you have the peer dependencies installed:

```bash
bun add solid-js clsx tailwind-merge valibot dayjs @solid-primitives/keyed @solid-primitives/scheduled @mdi/js
```

## Setup: Tailwind CSS Configuration

To ensure Tailwind scans the library's source files for classes (since components are published as source without a build step), add the following `@source` directive to your project's `src/layouts/tailwind.css` (or equivalent global stylesheet):

```css
@source '/node_modules/@adaptive-ds/solid-ui/export/**/*.{astro,html,md,mdx,ts,tsx}';
```

This tells Tailwind to include classes from the library's `.tsx`, `.ts`, and other relevant files in the purge process, preventing unused classes from being purged during the build. Without it, Tailwind might not detect classes used in imported components, leading to missing styles.

## Recommended: Absolute Import Alias

It is recommended to expose your local UI folder through `package.json` `imports`, so component imports stay stable and pleasant to read.

```json
{
  "imports": {
    "#ui/*.js": "./ui/*.ts",
    "#ui/*.jsx": "./ui/*.tsx",
    "#ui/*": "./ui/*"
  }
}
```

That gives you a clean absolute import path for your local components, while still keeping the source fully editable.

## Usage Example

```tsx
import { Button } from "@adaptive-ds/solid-ui/interactive/button/Button.tsx"
import { buttonVariant } from "@adaptive-ds/solid-ui/interactive/button/buttonCva"

function MyComponent() {
  return (
    <Button variant={buttonVariant.link} onClick={() => alert("Clicked!")}>
      Click Me
    </Button>
  )
}
```

## Components

The library includes a variety of UI components organized by category:

### Interactive

- [Button](https://github.com/david1gp/solid-ui/tree/main/lib/interactive/button) - Standard and icon buttons.
- [Link](https://github.com/david1gp/solid-ui/tree/main/lib/interactive/link) - Styled links and buttons.
- [Toggle](https://github.com/david1gp/solid-ui/tree/main/lib/interactive/toggle) - Toggle switches.
- [Dialog](https://github.com/david1gp/solid-ui/tree/main/lib/interactive/dialog) - Native dialogs.
- [Toast](https://github.com/david1gp/solid-ui/tree/main/lib/interactive/toast) - Notification toasts.
- [Popover](https://github.com/david1gp/solid-ui/tree/main/lib/interactive/popover) - Simple popovers.
- [Tabs](https://github.com/david1gp/solid-ui/tree/main/lib/interactive/tabs) - Tab navigation.

### Input

- [Input](https://github.com/david1gp/solid-ui/tree/main/lib/input/input) - Text inputs.
- [Textarea](https://github.com/david1gp/solid-ui/tree/main/lib/input/textarea) - Multi-line textareas.
- [Select](https://github.com/david1gp/solid-ui/tree/main/lib/input/select) - Single and multi-selects.
- [Radio](https://github.com/david1gp/solid-ui/tree/main/lib/input/radio) - Radio switches.
- [Form](https://github.com/david1gp/solid-ui/tree/main/lib/input/form) - Form utilities.

### Table

- [Table](https://github.com/david1gp/solid-ui/tree/main/lib/table) - Data tables with sorting, pagination, and filtering.
  - Table1: Basic table.
  - Table2: Sortable table.
  - Table3: Advanced table with search and pagination.

### Static

- [Container](https://github.com/david1gp/solid-ui/tree/main/lib/static/container) - Layout wrappers and page containers.
- [Loader](https://github.com/david1gp/solid-ui/tree/main/lib/static/loaders) - Loading animations.
- [Pages](https://github.com/david1gp/solid-ui/tree/main/lib/static/pages) - Error and success pages.
- [Img](https://github.com/david1gp/solid-ui/tree/main/lib/static/img) - Optimized image component.
- [Badge](https://github.com/david1gp/solid-ui/tree/main/lib/static/badge) - Badge component.
- [Timeline](https://github.com/david1gp/solid-ui/tree/main/lib/static/timeline) - Timeline layout.

### Utils

- [Class Utilities](https://github.com/david1gp/solid-ui/tree/main/lib/utils/ui) - `classMerge`, `classArr` for Tailwind class management.
- [i18n](https://github.com/david1gp/solid-ui/tree/main/lib/i18n) - Basic internationalization support.
- [Arrays & Objects](https://github.com/david1gp/solid-ui/tree/main/lib/utils/arr) - Utility functions for data manipulation.

For detailed API and props, see the [documentation](https://github.com/david1gp/solid-ui/tree/main/docs) or check the source in `/lib`.

## Development

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/david1gp/solid-ui.git
   cd solid-ui
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Run development server:
   ```bash
   bun run dev
   ```

### Scripts

- `bun run dev`: Start development server (Rsbuild).
- `bun run build`: Build for production.
- `bun run vite:dev`: Alternative dev server with Vite.
- `bun run generateDemoList`: Generate demo list for components.
- `bun run publish`: Publish to npm.

### Project Structure

```
.
├── lib/                 # Source components
│   ├── interactive/     # Interactive elements (buttons, dialogs, etc.)
│   ├── input/           # Form inputs
│   ├── table/           # Data tables
│   ├── static/          # Static UI elements
│   ├── utils/           # Utility functions
│   └── types.d.ts       # Global types
├── src/                 # Demo app and examples
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

### Contributing

1. Fork the project.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built on top of [Solid.js](https://www.solidjs.com/).
- Styled with [Tailwind CSS](https://tailwindcss.com/).
- Icons from [MDI](https://pictogrammers.com/library/mdi/).

For more information, visit the [GitHub repository](https://github.com/david1gp/solid-ui).
