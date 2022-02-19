import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {host} from "../../api/ApiClient";
import {Message} from "../../models";

export class ChatWebhook {
  private webhook: HubConnection | undefined
  
  private readonly chatId: number;
  
  constructor(chatId: number) {
    this.chatId = chatId;
  }

  async start() {
    const webhook = new HubConnectionBuilder()
      .withUrl(`${host}chats?chatId=${this.chatId}`)
      .withAutomaticReconnect()
      .build()

    await webhook.start()
    this.webhook = webhook
  }

  onMessageAdded(callback: (message: Message) => void) {
    this.ensureWebhook()

    this.webhook?.on("ReceiveMessage", (messageJson: string) => {
      const message = JSON.parse(messageJson) as Message
      callback(message)
    })
  }

  emitMessage(message: Message) {
    this.ensureWebhook()
    
    this.webhook?.send('EmitMessage', JSON.stringify(message))
  }

  private ensureWebhook() {
    if (!this.webhook) {
      throw new Error(
        `Before add webhook listener you need to establish connection for chat.id = ${this.chatId}`
      )
    }
  }
}