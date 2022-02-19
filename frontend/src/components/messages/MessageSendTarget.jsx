import { useSelector } from "react-redux";
import MessageSend from "./MessageSend";

function MessageSendTarget() {
	const target = useSelector((state) => state.messageInfo);

	return <MessageSend target={target.username} />;
}

export default MessageSendTarget;
