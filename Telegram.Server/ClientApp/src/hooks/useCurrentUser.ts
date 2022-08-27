import {useAppSelector} from "../app/hooks";

export const useCurrentUser = () => {
  return useAppSelector(state => state.authorization.currentUser)
}