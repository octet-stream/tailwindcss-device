# tailwindcss-device

TailwindCSS plugin to add variants for input device detection using [`@media` queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)

## Installation

pnpm

```sh
pnpm add -D tailwindcss-device
```

npm

```
npm i -D tailwindcss-device
```

yarn

```
yarn add -D tailwindcss-device
```

### Usage

1. Add plugin to your `tailwind.config.js` plugins section:

```ts
import device from "tailwindcss-device"

export default {
  plugins: [
    device,
    // ...

    // or with custom prefix:
    deivce({prefix: "device"})
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

3. The result will look like this:

```css
.hidden {
  display: none;
}

@media (pointer: coarse) {
  .device-touch\:block {
    display: block;
  }
}

@media (pointer: fine) or (pointer: none) {
  .device-desktop\:block {
    display: block;
  }
}
```

## Available variants

| Name          | Target                                                                         |
|---------------|--------------------------------------------------------------------------------|
| touch         | Devices with touchscreen as primary input method (e.g smartphones and tablets) |
| desktop       | Computers with a mouse                                                         |
| desktop-touch | Computers with touch input device                                              |
| desktop-any   | Computers with or without touch input device                                   |

## Useful links

* [Media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries) reference documentation on MDN
* [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) documentation on MDN
* [`any-pointer`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/any-pointer) media feature documentation on MDN
* [`pointer`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) media feature documentation on MDN
