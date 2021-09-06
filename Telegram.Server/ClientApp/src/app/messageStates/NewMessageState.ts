import {MessageState} from "app/messageStates/MessageState";
import {Content, User} from "models";
import {Dispatch} from "react";
import {AnyAction} from "@reduxjs/toolkit";
import {ChatApi} from "api/ChatApi";
import {addMessage} from "app/slices/chatsSlice";

export class NewMessageState implements MessageState {
  constructor(
    private dispatch: Dispatch<AnyAction>,
    private chatId: number,
    private currentUser: User
  ) { }

  submit(data: FormData, content: Content[]) {
    const id = this.chatId;

    (new ChatApi(id)).addMessage(data)
    this.dispatch(
      addMessage({chatId: id, message: {content, author: this.currentUser, chatId: id}})
    )
  }
}