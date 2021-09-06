import React, {useState} from 'react';
import {ReactComponent as LeftArrowIcon} from 'public/svgs/left-arrow.svg';
import {useHistory} from "react-router";
import {isValidPhone} from "utils/isValidPhone";
import {PhonesApi} from "api/PhonesApi";
import {useFormInput} from "hooks/useFormInput";
import {PageNavigation} from "pages/partials/PageNavigation";

type Props = {

}

export const Login = (props: Props) => {
  const history = useHistory()
  const phone = useFormInput('89519370404')
  const [invalidPhoneMessage, setInvalidPhoneMessage] = useState('')

  const toVerification = async () => {
    if (isValidPhone(phone.value)) {
      const response = await new PhonesApi().find(phone.value)
      if (response.success) {
        const result = response.result
        history.push(`/registered-user-code-verification?phoneNumber=${result.number}&userId=${result.ownerId}`)
      } else {
        history.push(`/new-user-code-verification?phoneNumber=${phone.value}`)
      }
    } else {
      setInvalidPhoneMessage('Invalid phone number. Try again.')
    }
  }
  const toStart = () => history.push('/start')
  const onPhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    phone.onChange(e)
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
            value={phone.value}
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