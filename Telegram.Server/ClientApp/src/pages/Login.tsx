import React, {FormEvent, useState} from 'react';
import {useHistory} from "react-router-dom";
import {isValidPhone} from "utils/isValidPhone";
import {PhonesApi} from "api/PhonesApi";
import {useFormInput} from "hooks/useFormInput";
import {PageNavigation} from "pages/partials/PageNavigation";

export const Login = () => {
  const history = useHistory()
  const phoneInput = useFormInput('89519370404')
  const [invalidPhoneMessage, setInvalidPhoneMessage] = useState('')

  const toVerification = async (phoneNumber: string) => {
    return new PhonesApi().find(phoneNumber)
      .then(phone => history.push(`/telegram-verification?phoneNumber=${phone.number}&userId=${phone.ownerId}`))
      .catch(() => history.push(`/phone-verification?phoneNumber=${phoneInput.value}`))
  }
  const toStart = () => history.push('/start')

  const onNextClick = (e: FormEvent) => {
    e.preventDefault()
    
    const phone = phoneInput.value;
    if (isValidPhone(phone)) {
      toVerification(phone)
    } else {
      setInvalidPhoneMessage('Invalid phone number. Try again.')
    }
  }
  const onPhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    phoneInput.onChange(e)
    setInvalidPhoneMessage('')
  }

  return (
    <div className="page login-page">
      <PageNavigation onBackClick={toStart}/>
      <form className="login-form" onSubmit={onNextClick}>
        <div className="form-title">Your Phone Number</div>
        <p className="phone-caption">
          Please confirm your country code and<br/>
          enter your mobile phone number.
        </p>
        <div className="form-field login-phone-group">
          <input
            value={phoneInput.value}
            onInput={onPhoneInput}
            className="clear-input form-input phone-input"/>
          <div className="input-line"/>
        </div>
        <div className="invalid-phone-number">{invalidPhoneMessage}</div>
        <div
          className="btn btn-primary login-form-btn"
          onClick={onNextClick}>
          NEXT
        </div>
      </form>
    </div>
  )
}