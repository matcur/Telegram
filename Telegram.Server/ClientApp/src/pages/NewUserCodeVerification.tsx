import React, {useEffect, useState} from 'react'
import {BaseCodeVerification} from "pages/BaseCodeVerification";
import {VerificationApi} from "api/VerificationApi";
import {useQueryParams} from "hooks/useQueryParams";
import {RegistrationApi} from "api/RegistrationApi";

export const NewUserCodeVerification = () => {
  const query = useQueryParams()
  const [userId, setUserId] = useState(-1)

  const phoneNumber = query.get('phoneNumber') ?? ''
  const title = <span>
    A code was sent <strong>via Phone</strong> to your other<br/>
    devices, if you have any connected.
  </span>

  useEffect(() => {
    const load = async () => {
      const response = await new RegistrationApi().register({number: phoneNumber})
      const user = response.result
      setUserId(user.id)

      new VerificationApi().byPhone(phoneNumber)
    }

    load()
  }, [])

  return (
    <BaseCodeVerification
      title={title}
      phoneNumber={phoneNumber}
      userId={userId}/>
  )
}