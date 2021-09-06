import {useContext} from "react";
import {UpLayerContext} from "contexts/UpLayerContext";
import {LeftMenuContext} from "contexts/LeftMenuContext";

export const useSetLeftMenuVisible = () => {
  const upLayerContext = useContext(UpLayerContext)
  const leftMenuContext = useContext(LeftMenuContext)

  return (value: boolean) => {
    upLayerContext.setVisible(value)
    upLayerContext.setCentralElement(<div/>)
    leftMenuContext.setVisible(value)
  }
}