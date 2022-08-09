import {createContext, ReactElement} from "react";

export const UpLayerContext = createContext({
  hide: () => {},
  addArbitraryElement: (value: ReactElement) => {},
})