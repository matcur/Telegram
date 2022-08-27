import {useAppSelector} from "../app/hooks";

// Todo: change token selection to this
export const useToken = () => {
  return useAppSelector(state => state.authorization.token)
}