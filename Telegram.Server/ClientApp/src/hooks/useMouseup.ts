import {useWindowListener} from "./useWindowListener";
import {Nothing} from "../utils/functions";

export const useMouseup = (callback: Nothing, key: string) => {
  useWindowListener(e => {
    if (e.key === key) {
      callback()
    }
  }, "keyup")
}