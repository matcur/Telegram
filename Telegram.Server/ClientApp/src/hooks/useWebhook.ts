import {useEffect, useState} from "react";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {host} from "../api/ApiClient";

export const useWebhook = (resource: string, deps: any[] = []) => {
  const [webhook, setWebhook] = useState<HubConnection>()
  
  useEffect(() => {
    const load = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl(host + resource)
        .withAutomaticReconnect()
        .build()

      await connection.start()
      setWebhook(connection)
    }

    load()
  }, deps)
  
  return webhook
}