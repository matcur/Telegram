import {createContext, ReactElement} from "react";
import {Position} from "../utils/type";

export const UpLayerContext = createContext({
  addCentralElement: (value: ReactElement) => () => {},
  hide: () => {},
  addArbitraryElement: (value: ReactElement) => {},
})