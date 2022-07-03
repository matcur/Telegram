import {Message} from "../../models";

export interface MessageState {
  save(message: Partial<Message>): void;
}