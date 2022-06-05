import {Message} from "../../models";

type Props = {
  message: Message
  onReplyClick(message: Message): void
}

export const MessageOptions = ({message, onReplyClick}: Props) => {
  return (
    <div className="message-options">
      <div
        className="message-option"
        onClick={() => onReplyClick(message)}
      >Reply</div>
    </div>
  )
}