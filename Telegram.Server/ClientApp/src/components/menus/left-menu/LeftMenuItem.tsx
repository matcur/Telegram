import {Modal} from 'components/Modal';
import React, {FC, ReactElement} from 'react'
import {useFlag} from "../../../hooks/useFlag";

type Props = {
  name: string
  icon?: ReactElement
  additionalElement?: ReactElement
  getCentralElement?: (hide: () => void) => ReactElement
}

export const LeftMenuItem: FC<Props> = ({name, icon, additionalElement, getCentralElement}: Props) => {
  const [modalVisible, showModal, hideModal] = useFlag(false)
  
  return (
    <div
      className="left-menu-option"
      onClick={showModal}>
      {modalVisible && getCentralElement && (
        <Modal hide={hideModal} name={`LeftMenuItem_${name}`}>{getCentralElement(hideModal)}</Modal>
      )}
      {icon}
      <div className="option-name">{name}</div>
      {additionalElement}
    </div>
  )
}