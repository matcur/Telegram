import React, {FC, useContext} from 'react'
import {useAppDispatch, useAppSelector} from "app/hooks";
import {Search} from "components/search/Search";
import {useFormInput} from "hooks/useFormInput";
import {ShortUserInfo} from "components/user/ShortUserInfo";
import {FormButton} from "components/form/FormButton";
import {like} from "utils/like";
import {User} from "models";
import {useArray} from "hooks/useArray";
import {ChatsApi} from "api/ChatsApi";
import {addChat} from "app/slices/authorizationSlice";
import {UpLayerContext} from "contexts/UpLayerContext";

type Props = {
  onCreateClick: (users: User[]) => void
}

export const AddMembersForm: FC<Props> = ({onCreateClick}) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const search = useFormInput()
  const selectedFriends = useArray<User>()

  const filtered = currentUser.friends?.filter(
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
    <div className="form add-members-form">
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
        <FormButton name="Cancel"/>
        <FormButton
          name="Create"
          onClick={() => onCreateClick(selectedFriends.value)}/>
      </div>
    </div>
  )
}