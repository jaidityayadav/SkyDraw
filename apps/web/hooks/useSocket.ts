import { useEffect, useState } from "react";

export function useSocket() {
    const wsURL = process.env.NEXT_PUBLIC_WS_URL;

    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {

        if (!wsURL) {
            return;
        }

        const ws = new WebSocket(wsURL);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, [])

    return {
        socket,
        loading
    }
}