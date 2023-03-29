# tailwind-plugin-device

TailwindCSS plugin to add variants for input device detection using `@media` queries

## Installation

pnpm

```sh
pnpm add -D tailwind-plugin-device
```

npm

```
npm i tailwind-plugin-device
```

yarn

```
yarn add tailwind-plugin-device
```

### Usage

1. Add plugin to your `tailwind.config.js` plugins section:

```ts
import device from "tailwind-plugin-device"

export default {
  plugins: [
    device
    // ...
  ]
}
```

2. And then prefix utilities using available variants:

```html
<div class="border border-black rounded-md device-touch:rounded-lg">
  <div class="hidden device-touch:block">
    Hello, I'm visible on smartphones and tables!
  </div>
  <div class="hidden device-desktop:block">
    Hello, I'm visible on computer with mouse!
  </div>
<div>
```

### Available variants

| Name          | Target                                                                         |
|---------------|--------------------------------------------------------------------------------|
| touch         | Devices with touchscreen as primary input method (e.g smartphones and tablets) |
| desktop       | Computers with a mouse                                                         |
| desktop-touch | Computers with touch input device                                              |
| desktop-any   | Computers with or without touch input device                                   |
