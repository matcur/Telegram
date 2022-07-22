import React, {FC, useCallback} from 'react'
import {Search} from "components/search/Search";
import {useFormInput} from "hooks/useFormInput";
import {ShortUserInfo} from "components/user/ShortUserInfo";
import {like} from "utils/like";
import {User} from "models";
import {BaseForm} from "./BaseForm";
import {SetType} from "../../utils/type";

type Props = {
  footer: JSX.Element
  potentialMembers?: User[]
  selected: User[]
  setSelected(value: SetType<User[]>): void
}

// TODO: extract potentialMembers to component
export const AddMembersForm: FC<Props> = ({selected, setSelected, footer, potentialMembers = []}) => {
  const search = useFormInput()

  const filtered = potentialMembers.filter(
    f => like(`${f.firstName} ${f.lastName}`, search.value)
  )
  const remove = useCallback((user: User) => {
    setSelected(selected => [...selected.filter(s => s.id !== user.id)])
  }, [setSelected])
  const add = useCallback((user: User) => {
    setSelected(selected => {
      return [...selected, user]
    })
  }, [setSelected])
  const friendInfo = (user: User, key: number) => {
    const isSelected = selected.includes(user)

    return <ShortUserInfo
      key={key}
      user={user}
      onClick={isSelected ? remove : add}
      className={`friend-info ${isSelected? 'selected-friend': ''}`}/>
  }

  return (
    <BaseForm className={"add-members-form"}>
      <div className="add-members-form-header">
        <span className="form-title add-members-title">Add Members</span>
        <span className="invite-friend-count">{selected.length} / 20000</span>
        <Search
          className="add-member-search"
          onChange={search.onChange}/>
      </div>
      <div className="friends scrollbar">
        {filtered?.map(friendInfo)}
      </div>
      {footer}
    </BaseForm>
  )
}