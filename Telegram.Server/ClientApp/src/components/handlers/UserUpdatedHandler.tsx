import React, {FC, useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useToken} from "../../hooks/useToken";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {subscribeAddedInChat, subscribeUserUpdated} from "../../app/chat/userWebsocket";
import {User} from "../../models";
import {addChats, updateAuthorizedUser, updateFriend} from "app/slices/authorizationSlice";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";

type Props = {}

export const UserUpdatedHandler: FC<Props> = ({children}) => {
  const dispatch = useDispatch()
  const currentUser = useCurrentUser()
  const token = useToken()
  
  const updateUser = useCallback((user: User) => {
    if (user.id === currentUser.id) {
      dispatch(updateAuthorizedUser(user))
    } else {
      dispatch(updateFriend(user))
    }
  }, [currentUser.id])
  
  const addNewChat = async (chatId: number) => {
    const chat = await new AuthorizedUserApi(token).chat(chatId)
    dispatch(addChats([chat]))
  }
  
  useEffect(() => {
    const unsubscribes = [
      subscribeUserUpdated(updateUser),
      subscribeAddedInChat(addNewChat),
    ]
    
    return () => unsubscribes.forEach(u => u())
  }, [currentUser.id])
  
  return (
    <>{children}</>
  )
}