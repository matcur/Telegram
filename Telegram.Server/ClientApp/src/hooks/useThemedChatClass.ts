import {useTheme} from "./useTheme";
import {useEffect, useState} from "react";

export const useThemedChatClass = () => {
  const theme = useTheme()
  const [className, setClassName] = useState("")

  useEffect(() => {
    if (theme === "light") {
      // move to scss :local
      setClassName("light-chat-background")
    } else {
      // move to scss :local
      setClassName("dark-chat-background")
    }
  }, [theme])

  return className;
}