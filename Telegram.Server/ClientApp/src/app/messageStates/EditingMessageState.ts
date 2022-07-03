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

  async save(message: Partial<Message>) {
    this.setState(this.afterSubmitState)
    
    message.id = this.message.id
    const updatedMessage = await this.messages.update(message)
    
    this.dispatch(updateMessage(updatedMessage))
  }
}