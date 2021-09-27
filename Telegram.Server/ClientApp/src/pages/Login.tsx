import React, {FormEvent, useState} from 'react';
import {useHistory} from "react-router";
import {isValidPhone} from "utils/isValidPhone";
import {PhonesApi} from "api/PhonesApi";
import {useFormInput} from "hooks/useFormInput";
import {PageNavigation} from "pages/partials/PageNavigation";

export const Login = () => {
  const history = useHistory()
  const phoneInput = useFormInput('89519370404')
  const [invalidPhoneMessage, setInvalidPhoneMessage] = useState('')

  const toVerification = async (e: FormEvent) => {
    e.preventDefault()
    if (isValidPhone(phoneInput.value)) {
      const response = await new PhonesApi().find(phoneInput.value)
      if (response.success) {
        const phone = response.result
        history.push(`/registered-user-code-verification?phoneNumber=${phone.number}&userId=${phone.ownerId}`)
      } else {
        history.push(`/new-user-code-verification?phoneNumber=${phoneInput.value}`)
      }
    } else {
      setInvalidPhoneMessage('Invalid phone number. Try again.')
    }
  }
  const toStart = () => history.push('/start')
  const onPhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    phoneInput.onChange(e)
    setInvalidPhoneMessage('')
  }

  return (
    <div className="page login-page">
      <PageNavigation onBackClick={toStart}/>
      <form className="login-form" onSubmit={toVerification}>
        <div className="form-title">Your Phone Number</div>
        <p className="phone-caption">
          Please confirm your country code and<br/>
          enter your mobile phone number.
        </p>
        <div className="form-group login-phone-group">
          <input
            value={phoneInput.value}
            onInput={onPhoneInput}
            className="clear-input form-input phone-input"/>
          <div className="input-line"/>
        </div>
        <div className="invalid-phone-number">{invalidPhoneMessage}</div>
        <div
          className="btn btn-primary login-form-btn"
          onClick={toVerification}>
          NEXT
        </div>
      </form>
    </div>
  )
}