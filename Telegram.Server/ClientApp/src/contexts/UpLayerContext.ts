import {createContext, ReactElement} from "react";

export const UpLayerContext = createContext({
  addCentralElement: (value: ReactElement) => () => {},
  hide: () => {},
  addArbitraryElement: (value: ReactElement) => {},
})