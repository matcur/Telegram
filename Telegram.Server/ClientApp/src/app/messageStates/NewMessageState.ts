import {MessageState} from "app/messageStates/MessageState";
import {Content} from "models";
import {MessagesApi} from "../../api/MessagesApi";

export class NewMessageState implements MessageState {
  constructor(
    private messages: MessagesApi,
  ) { }

  save(data: FormData, content: Content[]) {
    this.messages.add(data)
  }
}