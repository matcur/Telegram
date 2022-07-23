import {BaseForm} from "./BaseForm";
import React, {useCallback, useRef, useState} from "react";
import {Nothing} from "../../utils/functions";
import {Chat, User} from "../../models";
import {Toggler} from "../form/Toggler";
import {InfiniteScroll} from "../lists/InfiniteScroll";
import {Pagination} from "../../utils/type";
import {ShortUserInfo} from "../user/ShortUserInfo";
import {AddMembersForm} from "./AddMembersForm";
import {FormButton} from "../form/FormButton";
import {useFlag} from "../../hooks/useFlag";
import {Modal} from "../Modal";

type Props = {
  group: Chat
  totalMemberCount: number
  onHideClick: Nothing
  potentialMembers: User[]
  loadMembers(chatId: number, pagination: Pagination): void
  addMembers(members: User[]): void
}

export const GroupForm = ({onHideClick, group, totalMemberCount, loadMembers, addMembers, potentialMembers}: Props) => {
  const [addMembersVisible, showAddMembers, hideAddMembers] = useFlag(false)
  const [needNotify, setNeedNotify] = useState(false)
  const toggleNotify = useCallback(
    () => setNeedNotify(value => !value),
    []
  )
  const [futureMembers, setFutureMembers] = useState<User[]>([])
  const membersRef = useRef<User[]>([])
  membersRef.current = futureMembers
  const loadNextMembers = useCallback(() => {
    const memberCount = group.members.length;
    if (totalMemberCount === memberCount) return
    
    loadMembers(group.id, {offset: memberCount, count: 30})
  }, [])
  const addMembersForm = () => {
    const footer = (
      <div className="form-buttons add-members-buttons">
        <FormButton
          name="Cancel"
          onClick={hideAddMembers}/>
        <FormButton
          name="Add"
          onClick={() => addMembers(membersRef.current)}/>
      </div>
    )
    return (
      <Modal hide={hideAddMembers} name="GroupFormAddMembers">
        <AddMembersForm
          potentialMembers={potentialMembers}
          footer={footer}
          setSelected={setFutureMembers}
          selected={futureMembers}
        />
      </Modal>
    )
  }
  
  return (
    <BaseForm className="group-form middle-size-form">
      {addMembersVisible && addMembersForm()}
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
      <a onClick={showAddMembers} className="add-new-members">
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