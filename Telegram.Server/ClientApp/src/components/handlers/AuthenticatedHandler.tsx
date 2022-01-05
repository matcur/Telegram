import {FC, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router";
import {useDispatch} from "react-redux";
import {AuthorizedUserApi} from "../../api/AuthorizedUserApi";
import {authorize} from "../../app/slices/authorizationSlice";

export const AuthenticatedHandler: FC = ({children}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const token = localStorage.getItem('app-authorization-token')

  useEffect(() => {
    if (token === null) {
      history.push('/start')
      setLoaded(true)
      return
    }
    (new AuthorizedUserApi(token))
      .authorizedUser()
      .then(res => res.result)
      .then(currentUser => {
        dispatch(authorize({
          currentUser,
          token
        }))
        history.push('/')
      })
      .catch(() => history.push('/start'))
      .finally(() => setLoaded(true))
  }, [])
  
  return <>
    {loaded? children: <div>Loading</div>}
  </>
}