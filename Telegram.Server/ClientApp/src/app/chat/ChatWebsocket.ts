import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Message, User} from "../../models";
import {typingThrottleTime} from "../../components/message/MessageInputting";
import {throttle} from "../../utils/throttle";
import {Nothing} from "../../utils/functions";

export interface IChatWebsocket {
  chatId(): number;
  
  start(): Promise<void>;

  onMessageAdded(callback: (message: Message) => void): Nothing;

  removeMessageAdded(callback: () => void): void;

  onMessageUpdated(callback: (Message: Message) => void): void;

  removeMessageUpdated(callback: () => void): void;

  onMessageTyping(callback: (author: User) => void): void;

  removeMessageTyping(callback: () => void): void;
  
  emitMessageTyping(...args: any[]): void;

  onMemberUpdated(callback: (member: User) => void): Nothing;

  removeMemberUpdated(callback: () => void): void;
}

// Todo: change to functions with variables like fields
export class ChatWebsocket implements IChatWebsocket {
  private _webhook: HubConnection | undefined
  
  private readonly _chatId: number;
  
  private readonly _authorizeToken: string;
  
  constructor(chatId: number, authorizeToken: string) {
    this._chatId = chatId;
    this._authorizeToken = authorizeToken;
  }
  
  chatId() {
    return this._chatId
  }

  async start() {
    const webhook = new HubConnectionBuilder()
      .withUrl(`/hubs/chats?chatId=${this._chatId}`, {
        accessTokenFactory: () => this._authorizeToken,
      })
      .withAutomaticReconnect()
      .build()

    this._webhook = webhook
    await webhook.start()
  }

  onMessageAdded(callback: (message: Message) => void) {
    this._webhook?.on("MessageAdded", (messageJson: string) => {
      callback(JSON.parse(messageJson) as Message)
    })
    
    return () => this._webhook?.off("MessageAdded", callback)
  }

  removeMessageAdded(callback: (message: Message) => void) {
    this._webhook?.off("MessageAdded", callback)
  }

  onMessageUpdated(callback: (Message: Message) => void) {
    this._webhook!.on("MessageUpdated", json => {
      callback(JSON.parse(json) as Message)
    })
  }

  removeMessageUpdated(callback: (message: Message) => void) {
    this._webhook!.off("MessageUpdated", callback)
  }

  emitMessageTyping = throttle(() => {
    this._webhook!.invoke("EmitMessageTyping")
  }, typingThrottleTime)

  onMessageTyping(callback: (author: User) => void) {
    this._webhook!.on("MessageTyping", json => {
      callback(JSON.parse(json) as User)
    })
  }

  removeMessageTyping(callback: (author: User) => void) {
    this._webhook!.off("MessageTyping", callback)
  }
  
  onMemberUpdated(callback: (member: User) => void) {
    this._webhook?.on("MemberUpdated", json => {
      callback(JSON.parse(json) as User)
    })
    
    return () => this._webhook?.off("MemberUpdated", callback)
  }

  removeMemberUpdated(callback: () => void) {
    this._webhook?.off("MemberUpdated")
  }
}