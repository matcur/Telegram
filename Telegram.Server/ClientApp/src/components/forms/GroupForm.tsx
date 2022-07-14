import {BaseForm} from "./BaseForm";
import React, {useCallback, useState} from "react";
import {Nothing} from "../../utils/functions";
import {Chat, User} from "../../models";
import {Toggler} from "../form/Toggler";
import {InfiniteScroll} from "../lists/InfiniteScroll";
import {Pagination} from "../../utils/type";
import {ShortUserInfo} from "../user/ShortUserInfo";
import {useCentralPosition} from "../../hooks/useCentralPosition";
import {AddMembersForm} from "./AddMembersForm";

type Props = {
  group: Chat
  totalMemberCount: number
  onHideClick: Nothing
  potentialMembers: User[]
  loadMembers(chatId: number, pagination: Pagination): void
  addMembers(members: User[]): void
}

export const GroupForm = ({onHideClick, group, totalMemberCount, loadMembers, addMembers, potentialMembers}: Props) => {
  const [needNotify, setNeedNotify] = useState(false)
  const addMembersForm = useCentralPosition()
  const toggleNotify = useCallback(
    () => setNeedNotify(value => !value),
    []
  )
  const loadNextMembers = useCallback(() => {
    const memberCount = group.members.length;
    if (totalMemberCount === memberCount) return
    
    loadMembers(group.id, {offset: memberCount, count: 30})
  }, [])
  const showAddNewMembersForm = useCallback(() => {
    addMembersForm.show(
      <AddMembersForm
        onCreateClick={addMembers}
        hide={addMembersForm.hide}
        potentialMembers={potentialMembers}
      />
    )
  }, [])
  
  return (
    <BaseForm className="group-form middle-size-form">
      <div className="form-header group-form-header">
        <div className="form-title">Group Info</div>
        <a
          className="close settings-form-close"
          onClick={onHideClick}
        />
      </div>
      <div className="group-avatar-wrapper">
        <img className="big-avatar" src={group.iconUrl} alt={`${group.name} avatar`}/>
        <div className="group-details">
          <div className="group-name">{group.name}</div>
          <div className="members-count">{totalMemberCount} members</div>
        </div>
      </div>
      <div className="form-splitter"/>
      <div className="form-grouping">
        <div className="group-form-row form-row-hover" onClick={toggleNotify}>
          <div className="group-form__icon-column"></div>
          <div className="value-column df aic jcsb">
            <span>Notifications</span>
            <Toggler setValue={setNeedNotify} value={needNotify}/>
          </div>
        </div>
      </div>
      <div className="form-splitter"/>
      <a onClick={showAddNewMembersForm} className="add-new-members">
        Add new members
      </a>
      <InfiniteScroll
        onBottomTouch={loadNextMembers}
      >
        {group.members.map(
          member => <ShortUserInfo
            user={member}
          />
        )}
      </InfiniteScroll>
    </BaseForm>
  )
}