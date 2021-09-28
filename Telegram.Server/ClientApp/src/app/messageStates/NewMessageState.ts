import {MessageState} from "app/messageStates/MessageState";
import {Content, User} from "models";
import {Dispatch} from "react";
import {AnyAction} from "@reduxjs/toolkit";
import {ChatApi} from "api/ChatApi";
import {addMessage} from "app/slices/authorizationSlice";

export class NewMessageState implements MessageState {
  constructor(
    private dispatch: Dispatch<AnyAction>,
    private currentUser: User,
    private chatId: number,
  ) { }

  async save(data: FormData, content: Content[]) {
    const id = this.chatId;

    const response = await new ChatApi(id).addMessage(data)
    const message = response.result
    message.author = this.currentUser
    
    this.dispatch(
      addMessage({chatId: id, message})
    )
  }
}