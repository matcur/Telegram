import React, {useEffect, useState} from 'react'
import {BaseCodeVerification} from "pages/BaseCodeVerification";
import {VerificationApi} from "api/VerificationApi";
import {useQueryParams} from "hooks/useQueryParams";
import {RegistrationApi} from "api/RegistrationApi";

export const PhoneVerification = () => {
  const query = useQueryParams()
  const [userId, setUserId] = useState(-1)

  const phoneNumber = query.get('phoneNumber') ?? ''
  const title = <span>
    A code was sent <strong>via Phone</strong>.
  </span>

  useEffect(() => {
    const load = async () => {
      const user = await new RegistrationApi().register({number: phoneNumber})
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