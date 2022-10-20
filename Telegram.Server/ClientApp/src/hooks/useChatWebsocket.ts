import {onMemberUpdated, onMessageAdded} from "../app/chat/chatWebsocket";
import {Message, User} from "../models";
import {changeChatUpdatedDate, updateChatMember} from "../app/slices/authorizationSlice";
import {useDispatch} from "react-redux";
import {useFunction} from "./useFunction";

export const useChatWebsocket = () => {
  const dispatch = useDispatch()
  
  const subscribe = useFunction((chatId: number) => {
    // make unsubscribe
    const updateMessage = (message: Message) => {
      dispatch(changeChatUpdatedDate({
        chatId: chatId,
        value: message.creationDate,
      }))
    }
    const updateMember = (member: User) => {
      dispatch(updateChatMember({
        member,
        chatId,
      }))
    }

    const unsubscribes: (() => void)[] = []
    unsubscribes.push(
      onMessageAdded(chatId, updateMessage),
      onMemberUpdated(chatId, updateMember)
    )

    return () => unsubscribes.forEach(u => u())
  })
  
  return subscribe
}