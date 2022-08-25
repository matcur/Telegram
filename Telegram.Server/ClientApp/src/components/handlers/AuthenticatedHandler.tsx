import {FC, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";
import {authorize, flushToken} from "../../app/slices/authorizationSlice";
import {useAppSelector} from "../../app/hooks";
import {User} from "../../models";

export const AuthenticatedHandler: FC = ({children}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const token = useAppSelector(state => state.authorization.token)
  
  const onFail = () => {
    history.push('/start')
    dispatch(flushToken())
  }
  
  const onSuccess = (currentUser: User) => {
    dispatch(authorize({
      currentUser,
      token
    }))
    history.push('/')
  }

  useEffect(() => {
    if (!token) {
      history.push('/start')
      setLoaded(true)
      return
    }
    (new AuthorizedUserApi(token))
      .authorizedUser()
      .then(onSuccess)
      .catch(onFail)
      .finally(() => setLoaded(true))
  }, [])
  
  return <>
    {loaded? children: <div>Loading</div>}
  </>
}