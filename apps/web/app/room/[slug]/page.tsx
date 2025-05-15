import axios from "axios";
import { ChatRoom } from "../../../components/ChatRoom";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

async function getRoomId(slug: string) {
    const backendURL =process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendURL) {
        throw new Error("backendURL is not defined");
    }

    const response = await axios.get(`${backendURL}/room/${slug}`);

    return response.data.roomId;
}

export default async function Room(props: PageProps) {
    const params = await props.params;
    const slug = params.slug;

    const roomId = await getRoomId(slug);

    return (
        <div className="flex justify-center items-center min-h-screen text-white bg-black">
            <div>
                <ChatRoom id={roomId}/>
            </div>
        </div>
    );
}
