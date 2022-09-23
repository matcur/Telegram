import React, {FC, useEffect, useRef} from "react"
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {emitOffline, emitOnline, initActiveWebsocket} from "../../app/chat/activeWebsocket";
import {useToken} from "../../hooks/useToken";
import {Nothing} from "../../utils/functions";
import {onWindowBlur, onWindowFocus} from "../../utils/onWindow";
import {callWith} from "../../utils/array/callWith";
import {useFlag} from "../../hooks/useFlag";

export const ActivityHandler: FC = ({children}) => {
  const currentUser = useCurrentUser()
  const token = useToken()
  const unsubscribe = useRef<Nothing>()
  const [focused, focus, blur] = useFlag(true)
  
  const onFocus = () => {
    emitOnline(currentUser.id)
    focus()
  }
  const onBlur = () => {
    emitOffline(currentUser.id)
    blur()
  }
  
  useEffect(function initActivity() {
    initActiveWebsocket(currentUser.id, token)
      .then(callback => {
        unsubscribe.current = callback
        onFocus()
      })

    const unsubscribes = [
      onWindowFocus(onFocus),
      onWindowBlur(onBlur),
    ]    
    
    return () => {
      unsubscribe.current && unsubscribe.current()
      callWith(unsubscribes, undefined)
    }
  }, [currentUser.id])
  
  return (
    <>
      {children}
    </>
  )
}