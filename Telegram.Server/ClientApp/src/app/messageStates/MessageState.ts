import {Content} from "models";

export interface MessageState {
  submit(data: FormData, content: Content[]): void;
}