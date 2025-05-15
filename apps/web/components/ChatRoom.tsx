import axios from "axios";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: Number) {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await axios.get(`${backendURL}/chats/${roomId}`);
    return response.data.messages;
}

export async function ChatRoom({ id }: { id: Number }) {
    const messages = await getChats(id);
    return <div>
        <ChatRoomClient id={id} messages={messages}/>
    </div>
}