import React, {FC, useEffect, useState} from 'react'
import {BaseCodeVerification} from "pages/BaseCodeVerification";
import {useParams} from "react-router";
import {VerificationApi} from "api/VerificationApi";
import {useQueryParams} from "hooks/useQueryParams";
import {RegistrationApi} from "api/RegistrationApi";

type Props = {

}

export const NewUserCodeVerification: FC<Props> = ({}: Props) => {
  const query = useQueryParams()
  const [userId, setUserId] = useState(-1)

  const phoneNumber = query.get('phoneNumber') ?? ''
  const title = <span>
    A code was sent <strong>via Phone</strong> to your other<br/>
    devices, if you have any connected.
  </span>

  useEffect(() => {
    async function load() {
      const user = (await (new RegistrationApi().register({number: phoneNumber}))).result
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