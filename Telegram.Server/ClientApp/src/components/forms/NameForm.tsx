import {SimpleChangeForm} from "./SimpleChangeForm";
import {TextFields} from "../form/TextFields";
import {SmallTextField} from "../form/SmallTextField";
import React, {useCallback, useState} from "react";
import {User} from "../../models";

type Props = {
  user: Partial<User>
  save(user: {firstName?: string, lastName?: string}): void
  hide(): void
}

export const NameForm = ({user, save, hide}: Props) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [firstNameInvalid, setFirstNameInvalid] = useState(!user.firstName)
  
  const onSave = useCallback(() => {
    if (firstNameInvalid) {
      return
    }
    if (firstName === user.firstName && lastName === user.lastName) {
      return hide()
    }
    save({firstName, lastName})
    hide()
  }, [save, firstName, lastName, firstNameInvalid])
  const onHide = useCallback(() => {
    if (firstNameInvalid) {
      return
    }
    hide()
  }, [hide, firstNameInvalid])
  const onFirstNameChange = useCallback(e => {
    const value = e.currentTarget.value;
    setFirstNameInvalid(!value)
    setFirstName(value)
  }, [])
  
  return (
    <SimpleChangeForm title="Name" onSave={onSave} onClose={onHide}>
      <TextFields>
        <SmallTextField
          label="First Name"
          input={{value: firstName, onChange: onFirstNameChange}}
          isInvalid={firstNameInvalid}
        />
        <SmallTextField
          label="Last Name"
          input={{value: lastName, onChange: e => setLastName(e.currentTarget.value)}}
        />
      </TextFields>
    </SimpleChangeForm>
  )
}