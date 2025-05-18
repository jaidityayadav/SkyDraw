import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClient";
import { backendURL } from "@repo/common/env";

async function getChats(roomId: number) {
    const response = await axios.get(`${backendURL}/chats/${roomId}`);
    return response.data.messages;
}

export async function ChatRoom({ id }: {
    id: number
}) {
    const messages = await getChats(id);
    return <ChatRoomClient id={id} messages={messages} />
}