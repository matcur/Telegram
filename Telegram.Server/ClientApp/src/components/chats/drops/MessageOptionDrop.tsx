import {Message} from "../../../models";
import {Position} from "../../../utils/type";
import {ArbitraryElement} from "../../up-layer/ArbitraryElement";
import {MessageOptions} from "../../message/MessageOptions";
import React from "react";
import {ModalVisibleData} from "../../../hooks/useModalVisible";
import {useFunction} from "../../../hooks/useFunction";

type Props = {
  messageOptions: ModalVisibleData<{message: Message, position: Position}>
  onReplyClick: (message: Message) => void
}

export const MessageOptionDrop = ({messageOptions, onReplyClick}: Props) => {
  const onReplyClickInternal = useFunction((message: Message) => {
    messageOptions.hide()
    onReplyClick(message)
  })
  
  return (
    <ArbitraryElement
      position={messageOptions.data.position}
      visible={messageOptions.visible}
      hide={messageOptions.hide}
      closingClass="some-class"
      closingDuration={5080}
    >
      <MessageOptions
        message={messageOptions.data.message}
        onReplyClick={onReplyClickInternal}
      />
    </ArbitraryElement>
  );
}