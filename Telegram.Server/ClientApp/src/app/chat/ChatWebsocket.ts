import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Message, User} from "../../models";
import {debounce} from "../../utils/debounce";
import {typingThrottleTime} from "../../components/message/MessageTyping";
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

    await webhook.start()
    this.webhook = webhook
  }

  onMessageAdded(callback: (message: Message) => void) {
    this.ensureWebhook()

    this.webhook?.on("MessageAdded", (messageJson: string) => {
      callback(JSON.parse(messageJson) as Message)
    })
  }
  
  removeMessageAdded(callback: (message: Message) => void) {
    this.ensureWebhook()

    this.webhook?.off("MessageAdded", callback)
  }
  
  onMessageUpdated(callback: (Message: Message) => void) {
    this.ensureWebhook()
    
    this.webhook!.on("MessageUpdated", json => {
      callback(JSON.parse(json) as Message)
    })
  }

  removeMessageUpdated(callback: (message: Message) => void) {
    this.ensureWebhook()

    this.webhook!.off("MessageUpdated", callback)
  }

  emitMessageTyping = throttle(() => {
    this.ensureWebhook()
  
    this.webhook!.invoke("EmitMessageTyping")
  }, typingThrottleTime)
  
  onMessageTyping(callback: (author: User) => void) {
    this.ensureWebhook()
    
    this.webhook!.on("MessageTyping", json => {
      callback(JSON.parse(json) as User)
    })
  }

  removeMessageTyping(callback: (author: User) => void) {
    this.ensureWebhook()

    this.webhook!.off("MessageTyping", callback)
  }

  private ensureWebhook() {
    if (!this.webhook) {
      throw new Error(
        `Before add webhook listener you need to establish connection for chat.id = ${this.chatId}`
      )
    }
  }
}