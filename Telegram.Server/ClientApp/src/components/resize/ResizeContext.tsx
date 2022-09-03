import {createContext} from "react";
import {nope} from "../../utils/functions";

export type ResizeValue = {
  decreaseWidth(width: number): void
  increaseWidth(width: number): void
  minWidth(): number
  width(): number
}

export type Resizes = Record<string, ResizeValue>

type ResizesType = {
  items: Resizes
  remove: (key: string) => void
  insert: (key: string, value: ResizeValue) => void
}

export const ResizesContext = createContext<ResizesType>({
  items: {},
  insert: nope,
  remove: nope,
})

type ResizeBarsType = {
  items: string[]
  insert: (key: string) => void
  remove: (key: string) => void
  moveLeft: (key: string, value: number) => void
  siblingsMinWidth: (key: string) => [number, number]
  siblingsWidth: (key: string) => [number, number]
}

export const ResizeBarsContext = createContext<ResizeBarsType>({
  items: [],
  moveLeft: nope,
  insert: nope,
  remove: nope,
  siblingsMinWidth: () => [0, 0],
  siblingsWidth: () => [0, 0],
})

type ParentResize = {
  disableUserSelect: () => void
  activateUserSelect: () => void
}

export const ParentResizeContext = createContext<ParentResize>({
  disableUserSelect: nope,
  activateUserSelect: nope,
})
