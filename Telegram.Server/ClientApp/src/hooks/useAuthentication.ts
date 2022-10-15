import {useAppDispatch} from "app/hooks";
import {authorize} from "app/slices/authorizationSlice";
import {UsersApi} from "api/UsersApi";
import {VerificationApi} from "api/VerificationApi";

export const useAuthentication = (users: UsersApi, verification: VerificationApi) => {
  const dispatch = useAppDispatch()

  return async (phoneNumber: string, code: string) => {
    const currentUser = (await users.findByPhone(phoneNumber))
    const token = (await verification.token({
      value: code, userId: currentUser.id
    }))

    dispatch(authorize({
      currentUser,
      token
    }))
  }
}