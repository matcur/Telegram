import {createContext, ReactElement} from "react";

export const UpLayerContext = createContext({
  hide: () => {},
  insertArbitraryElement: (value: ReactElement | undefined, key: string) => {},
  hideArbitraryElement: (key: string) => {},
})