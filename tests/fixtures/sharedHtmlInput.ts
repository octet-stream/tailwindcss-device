import {html} from "../utils/templates.ts"

export const input = html`
  <div class="device-touch:block hidden">
    Hello from mobile
  </div>

  <div class="device-desktop:block hidden">
    Hello from desktop
  </div>
`
