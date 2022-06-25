import {MessageState} from "app/messageStates/MessageState";
import {Message} from "models";
import {AnyAction} from "@reduxjs/toolkit";
import {updateMessage} from "app/slices/authorizationSlice";
import {MessagesApi} from "../../api/MessagesApi";

export class EditingMessageState implements MessageState {
  constructor(
      private message: Message,
      private setState: (state: MessageState) => void,
      private dispatch: React.Dispatch<AnyAction>,
      private afterSubmitState: MessageState,
      private messages: MessagesApi) { }

  async save(data: FormData) {
    this.setState(this.afterSubmitState)

    const id = this.message.id;
    data.append("id", id.toString())

    const updatedMessage = await this.messages.update(data)
    
    this.dispatch(updateMessage(updatedMessage))
  }
}