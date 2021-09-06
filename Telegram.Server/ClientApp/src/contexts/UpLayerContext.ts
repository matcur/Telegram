import {createContext, ReactElement} from "react";

export const UpLayerContext = createContext({
  setVisible: (value: boolean) => {},
  setCentralElement: (value: ReactElement) => {},
})