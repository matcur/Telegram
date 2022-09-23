import {Nothing} from "./functions";
import {addIfNotExists} from "./array/addInNotExists";
import {unsubscribe} from "./array/unsubscribe";
import {callWith} from "./array/callWith";

const focus: Nothing[] = []
const blur: Nothing[] = []

const onWindowFocus = (callback: Nothing) => {
  addIfNotExists(focus, callback)
  return unsubscribe(focus, callback)
}

const onWindowBlur = (callback: Nothing) => {
  addIfNotExists(blur, callback)
  return unsubscribe(blur, callback)
}

window.onfocus = () => {
  callWith(focus, undefined)
}

window.onblur = () => {
  callWith(blur, undefined)
}

export {
  onWindowFocus,
  onWindowBlur,
}