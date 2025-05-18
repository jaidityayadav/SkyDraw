"use client"
import { useEffect, useState } from "react";
import { wsURL } from "@repo/common/env";

export function useSocket() {

    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${wsURL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZGZlNjJjZS1iMmI0LTQxOTAtODZiNC1hZTY2YmQ2YTgzMzYiLCJpYXQiOjE3NDczMDk3MzN9.zMuPSw5hLybIzbwMcMXnLZb9uaMdxk6vSRs8dmete7I`)
        ws.onopen = () => {
            console.log("WebSocket connected");
            setLoading(false);
            setSocket(ws);
        }

        ws.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => {
            ws.close();
        };
    }, [])

    return {
        socket,
        loading
    }
}