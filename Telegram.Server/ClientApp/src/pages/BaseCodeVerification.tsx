import React, {FormEvent, ReactElement, useState} from 'react'
import {useHistory} from "react-router";
import {VerificationApi} from "api/VerificationApi";
import {CodesApi} from "api/CodesApi";
import {UsersApi} from "api/UsersApi";
import {useAuthentication} from "hooks/useAuthentication";
import {useFormInput} from "hooks/useFormInput";
import {PageNavigation} from "pages/partials/PageNavigation";

type Props = {
  title: ReactElement
  phoneNumber: string
  userId: number
}

export const BaseCodeVerification = ({title, phoneNumber, userId}: Props) => {
  const history = useHistory()
  const authenticate = useAuthentication(new UsersApi(), new VerificationApi())
  const code = useFormInput('607810')
  const [wrongCodeMessage, setWrongMessage] = useState('')

  const codes = new CodesApi()

  const toIndex = async (enteredCode: string) => {
    const response = await codes.valid({value: enteredCode, userId})
    if (response.result) {
      await authenticate(phoneNumber, enteredCode)
      history.push('/')

      return
    }

    setWrongMessage('Wrong code, try again.')
  }
  const toLogin = () => history.push(`/login?phoneNumber=${phoneNumber}`)
  const onCodeInput = (e: React.FormEvent<HTMLInputElement>) => {
    code.onChange(e)
    setWrongMessage('')
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toIndex(code.value)
  }

  return (
    <div className="page code-verification-page">
      <PageNavigation onBackClick={toLogin}/>
      <form className="login-form" onSubmit={onSubmit}>
        <div className="form-title">{phoneNumber}</div>
        <p className="phone-caption">
          {title}
        </p>
        <div className="form-group code-verification-group">
          <label htmlFor="code" className="input-label">Code</label>
          <input
            value={code.value}
            onInput={onCodeInput}
            className="clear-input form-input code-input"/>
          <div className="input-line"/>
        </div>
        <p style={{color: 'red'}}>{wrongCodeMessage}</p>
        <button
          type="submit"
          className="btn btn-primary login-form-btn">
          NEXT
        </button>
      </form>
    </div>
  )
}