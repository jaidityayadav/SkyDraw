"use client"
import { useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [slug, setSlug] = useState("");
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="flex justify-center align-middle bg-black min-h-screen 100vh ">
      <div>
        <input placeholder="slug" className="border-2 border-white text-white rounded p-1 m-2" value={slug} onChange={(e) => {
          setSlug(e.target.value);
        }}></input>

        <button className="bg-black px-3 py-1 border-white text-white rounded" onClick={() => {
          router.push(`/room/${slug}`)
        }}>Join</button>
      </div>
    </div>
  );
}