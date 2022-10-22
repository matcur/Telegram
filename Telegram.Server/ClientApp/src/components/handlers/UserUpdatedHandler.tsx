import React, {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useToken} from "../../hooks/useToken";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {onAddedInChat, onUserUpdated} from "../../app/websockets/userWebsocket";
import {User} from "../../models";
import {addChats, updateAuthorizedUser, updateFriend} from "app/slices/authorizationSlice";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";
import {useFunction} from "../../hooks/useFunction";

type Props = {}

export const UserUpdatedHandler: FC<Props> = ({children}) => {
  const dispatch = useDispatch()
  const currentUser = useCurrentUser()
  const token = useToken()
  
  const updateUser = useFunction((user: User) => {
    if (user.id === currentUser.id) {
      dispatch(updateAuthorizedUser(user))
    } else {
      dispatch(updateFriend(user))
    }
  })
  
  const addNewChat = async (chatId: number) => {
    const chat = await new AuthorizedUserApi(token).chat(chatId)
    dispatch(addChats([chat]))
  }
  
  useEffect(() => {
    const unsubscribes = [
      onUserUpdated(updateUser),
      onAddedInChat(addNewChat),
    ]
    
    return () => unsubscribes.forEach(u => u())
  }, [currentUser.id])
  
  return (
    <>{children}</>
  )
}