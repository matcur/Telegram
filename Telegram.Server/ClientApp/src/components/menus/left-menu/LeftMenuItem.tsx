import {Modal} from 'components/Modal';
import React, {FC, ReactElement} from 'react'
import {useFlag} from "../../../hooks/useFlag";
import {Nothing} from "../../../utils/functions";
import {useFunction} from "../../../hooks/useFunction";

type Props = {
  name: string
  icon?: ReactElement
  additionalElement?: () => ReactElement
  getCentralElement?: (hide: () => void) => ReactElement
  onClick: Nothing
}

export const LeftMenuItem: FC<Props> = ({onClick, name, icon, additionalElement, getCentralElement}: Props) => {
  const [modalVisible, showModal, hideModal] = useFlag(false)
  const onClickInternal = useFunction(() => {
    onClick()
    showModal()
  })
  
  return (
    <div
      className="left-menu-option"
      onClick={onClickInternal}>
      {modalVisible && getCentralElement && (
        <Modal hide={hideModal} name={`LeftMenuItem_${name}`}>{getCentralElement(hideModal)}</Modal>
      )}
      {icon}
      <div className="option-name">{name}</div>
      {additionalElement && additionalElement()}
    </div>
  )
}