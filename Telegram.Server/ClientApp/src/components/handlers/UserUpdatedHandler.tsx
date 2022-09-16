import React, {FC, useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useToken} from "../../hooks/useToken";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {init, subscribeUserUpdated, unsubscribe} from "../../app/chat/userWebsocket";
import {User} from "../../models";
import {updateAuthorizedUser, updateFriend} from "app/slices/authorizationSlice";
import {Nothing} from "../../utils/functions";

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
  
  useEffect(() => {
    init(currentUser.id, token)
    const unsubscribes = [
      subscribeUserUpdated(updateUser),
    ]
    
    return () => unsubscribes.forEach(u => u())
  }, [token])
  
  return (
    <>{children}</>
  )
}