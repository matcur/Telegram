import {MessageState} from "app/messageStates/MessageState";
import {Content, Message, User} from "models";
import {Dispatch} from "react";
import {AnyAction} from "@reduxjs/toolkit";
import {addMessage} from "app/slices/authorizationSlice";
import {emittingMessage} from "../../utils/emittingMessage";
import {MessagesApi} from "../../api/MessagesApi";

export class NewMessageState implements MessageState {
  constructor(
    private dispatch: Dispatch<AnyAction>,
    private currentUser: User,
    private chatId: number,
    private messages: MessagesApi
  ) { }

  async save(data: FormData, content: Content[]) {
    const id = this.chatId;

    const response = await this.messages.add(data)
    const message = response.result
    message.author = this.currentUser
    
    this.dispatch(
      addMessage({chatId: id, message})
    )
  }
}