"use client";

import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";

type Message = {
  id: number;
  sender: "user" | "official";
  text: string;
};

export default function AskOfficialChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "official",
      text: "Hello! How can the department assist you today?",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // 🔮 TEMP fake reply (remove when backend ready)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "official",
          text: "Thanks for your inquiry. The department will review it shortly.",
        },
      ]);
    }, 800);
  };

  return (
    <main className="h-screen bg-slate-950 text-white flex flex-col overflow-hidden">

      {/* Top bar */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="text-slate-400 hover:text-white transition flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to home
        </Link>

        <div>
          <h1 className="font-semibold">Ask Official</h1>
          <p className="text-xs text-slate-400">
            1‑on‑1 department conversation
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 max-w-4xl w-full mx-auto pb-24 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-orange-500 text-white"
                  : "bg-white/10 text-slate-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input box */}
    <div className="border-t border-white/10 p-4 sticky bottom-0 bg-slate-950">
      <div className="max-w-4xl mx-auto flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your inquiry..."
          className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-orange-500 hover:bg-orange-600 px-5 rounded-xl flex items-center justify-center transition active:scale-95"
        >
          <Send size={18} />
        </button>
      </div>
    </div>

    </main>
  );
}
