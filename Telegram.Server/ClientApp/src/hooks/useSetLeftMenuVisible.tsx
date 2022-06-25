import {useContext} from "react";
import {LeftMenuContext} from "contexts/LeftMenuContext";

export const useSetLeftMenuVisible = () => {
  const leftMenuContext = useContext(LeftMenuContext)

  return (value: boolean) => {
    leftMenuContext.setVisible(value)
  }
}