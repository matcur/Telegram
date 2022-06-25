import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Message, User} from "../../models";
import {typingThrottleTime} from "../../components/message/MessageInputting";
import {throttle} from "../../utils/throttle";

export class ChatWebsocket {
  private webhook: HubConnection | undefined
  
  private readonly chatId: number;
  
  private readonly authorizeToken: string;
  
  constructor(chatId: number, authorizeToken: string) {
    this.chatId = chatId;
    this.authorizeToken = authorizeToken;
  }

  async start() {
    const webhook = new HubConnectionBuilder()
      .withUrl(`/hubs/chats?chatId=${this.chatId}`, {
        accessTokenFactory: () => this.authorizeToken,
      })
      .withAutomaticReconnect()
      .build()

    this.webhook = webhook
    await webhook.start()
  }

  onMessageAdded(callback: (message: Message) => void) {
    this.webhook?.on("MessageAdded", (messageJson: string) => {
      callback(JSON.parse(messageJson) as Message)
    })
  }
  
  removeMessageAdded(callback: (message: Message) => void) {
    this.webhook?.off("MessageAdded", callback)
  }
  
  onMessageUpdated(callback: (Message: Message) => void) {
    this.webhook!.on("MessageUpdated", json => {
      callback(JSON.parse(json) as Message)
    })
  }

  removeMessageUpdated(callback: (message: Message) => void) {
    this.webhook!.off("MessageUpdated", callback)
  }

  emitMessageTyping = throttle(() => {
    this.webhook!.invoke("EmitMessageTyping")
  }, typingThrottleTime)
  
  onMessageTyping(callback: (author: User) => void) {
    this.webhook!.on("MessageTyping", json => {
      callback(JSON.parse(json) as User)
    })
  }

  removeMessageTyping(callback: (author: User) => void) {
    this.webhook!.off("MessageTyping", callback)
  }
}