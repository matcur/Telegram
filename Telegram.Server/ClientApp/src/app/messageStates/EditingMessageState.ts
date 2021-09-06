import {MessageState} from "app/messageStates/MessageState";
import {Content, Message} from "models";
import {Dispatch} from "react";
import {AnyAction} from "@reduxjs/toolkit";
import {updateMessage} from "app/slices/chatsSlice";
import {withTextContent} from "utils/withTextContent";
import {textContent} from "utils/textContent";

export class EditingMessageState implements MessageState {
  constructor(
    private message: Message,
    private setState: (state: MessageState) => void,
    private dispatch: Dispatch<AnyAction>,
    private afterSubmitState: MessageState
  ) { }

  submit(data: FormData, content: Content[]) {
    this.setState(this.afterSubmitState)

    const message = this.message
    this.dispatch(
      updateMessage({
        chatId: message.chatId,
        message: withTextContent(message, textContent(content))
      })
    )
  }
}