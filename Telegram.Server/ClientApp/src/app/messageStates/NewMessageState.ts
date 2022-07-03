import {MessageState} from "app/messageStates/MessageState";
import {MessagesApi} from "../../api/MessagesApi";
import {Message} from "../../models";

export class NewMessageState implements MessageState {
  constructor(
    private messages: MessagesApi,
  ) { }

  save(message: Message) {
    this.messages.add(message)
  }
}