import {Nothing} from "./functions";
import {callWith} from "./array/callWith";

const focus: Set<Nothing> = new Set()
const blur: Set<Nothing> = new Set()

const onWindowFocus = (callback: Nothing) => {
  focus.add(callback)
  return () => focus.delete(callback)
}

const onWindowBlur = (callback: Nothing) => {
  blur.add(callback)
  return () => blur.delete(callback)
}

window.onfocus = () => {
  callWith(focus.values())
}

window.onblur = () => {
  callWith(blur.values())
}

export {
  onWindowFocus,
  onWindowBlur,
}