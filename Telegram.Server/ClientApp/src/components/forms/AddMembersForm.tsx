import React, {FC} from 'react'
import {Search} from "components/search/Search";
import {useFormInput} from "hooks/useFormInput";
import {ShortUserInfo} from "components/user/ShortUserInfo";
import {FormButton} from "components/form/FormButton";
import {like} from "utils/like";
import {User} from "models";
import {useArray} from "hooks/useArray";
import {BaseForm} from "./BaseForm";

type Props = {
  onCreateClick: (users: User[]) => void
  potentialMembers?: User[]
  hide: () => void
}

// TODO: extract potentialMembers to component
export const AddMembersForm: FC<Props> = ({onCreateClick, hide, potentialMembers = []}) => {
  const search = useFormInput()
  const selectedFriends = useArray<User>()

  const filtered = potentialMembers.filter(
    f => like(`${f.firstName} ${f.lastName}`, search.value)
  )
  const friendInfo = (user: User, key: number) => {
    const selected = selectedFriends.value.includes(user)

    return <ShortUserInfo
      key={key}
      user={user}
      onClick={selected? selectedFriends.remove: selectedFriends.add}
      className={`friend-info ${selected? 'selected-friend': ''}`}/>
  }

  return (
    <BaseForm className={"add-members-form"}>
      <div className="add-members-form-header">
        <span className="form-title add-members-title">Add Members</span>
        <span className="invite-friend-count">{selectedFriends.value.length + 1} / 20000</span>
        <Search
          className="add-member-search"
          onChange={search.onChange}/>
      </div>
      <div className="friends scrollbar">
        {filtered?.map(friendInfo)}
      </div>
      <div className="form-buttons add-members-buttons">
        <FormButton
          name="Cancel"
          onClick={hide}/>
        <FormButton
          name="Create"
          onClick={() => onCreateClick(selectedFriends.value)}/>
      </div>
    </BaseForm>
  )
}