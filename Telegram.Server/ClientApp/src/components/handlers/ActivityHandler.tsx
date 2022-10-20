import React, {FC, useEffect, useRef} from "react"
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {emitOffline, emitOnline, initActiveWebsocket} from "../../app/chat/activeWebsocket";
import {useToken} from "../../hooks/useToken";
import {Nothing} from "../../utils/functions";
import {onWindowBlur, onWindowFocus} from "../../utils/onWindow";
import {callWith} from "../../utils/array/callWith";
import {useFlag} from "../../hooks/useFlag";
import {nullUser} from "../../nullables";

export const ActivityHandler: FC = ({children}) => {
  const currentUser = useCurrentUser()
  const token = useToken()
  const unsubscribe = useRef<Nothing>()

  const onFocus = () => {
    emitOnline(currentUser.id)
  }
  const onBlur = () => {
    emitOffline(currentUser.id)
  }
  
  useEffect(function initActivity() {
    if (currentUser === nullUser) {
      return
    }
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
      callWith(unsubscribes)
    }
  }, [currentUser.id])
  
  return (
    <>
      {children}
    </>
  )
}