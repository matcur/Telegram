import {useEffect, useRef, useState} from "react";
import {initActiveWebsocket, onOffline, onOnline} from "../app/chat/activeWebsocket";
import {callWith} from "../utils/array/callWith";
import {useToken} from "./useToken";
import {Nothing} from "../utils/functions";

export const useUserActivity = (userId: number) => {
  const token = useToken()
  const stopWebhook = useRef<Nothing>()
  const [data, setDate] = useState(() => ({state: "offline", lastActivity: new Date(0)}))

  useEffect(() => {
    initActiveWebsocket(userId, token)
      .then(callback => stopWebhook.current = callback)
    const unsubscribes = [
      onOnline(userId, () => setDate({state: "online", lastActivity: new Date()})),
      onOffline(userId, lastActivity => setDate({state: "offline", lastActivity: new Date(lastActivity)})),
    ]
    return () => {
      stopWebhook.current && stopWebhook.current()
      callWith(unsubscribes, undefined)
    }
  }, [userId])
  
  return data
}