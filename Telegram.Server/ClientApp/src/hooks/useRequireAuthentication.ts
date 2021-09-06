import {useHistory} from "react-router";
import {useAppSelector} from "app/hooks";

export const useRequireAuthentication = (redirectRoute: string) => {
  const history = useHistory()
  const token = useAppSelector(state => state.authorization.token)

  if (token === '') {
    history.push(redirectRoute)
  }
}