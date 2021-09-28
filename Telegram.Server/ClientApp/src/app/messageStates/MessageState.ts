import {Content} from "models";

export interface MessageState {
  save(data: FormData, content: Content[]): void;
}