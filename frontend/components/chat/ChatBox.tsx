"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Message } from "./types";

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "message-init",
      role: "agent",
      content:
        "Your performance has been strong, particularly in measurable outputs. However, leadership roles often require a broader institutional presence and visibility across the department.",
      timestamp: "Delivered just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: "Sent just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content:
          "Your outcomes are clear, and the committee values them. The next question is how consistently your visibility and institutional presence are recognized across teams.",
        timestamp: "Delivered just now",
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 space-y-8 max-w-2xl mx-auto w-full" id="chat-thread">
        <div className="flex flex-col items-center py-2">
          <span className="text-[10px] font-bold text-slate-600 bg-white/5 px-3 py-1 rounded-full border border-white/5 uppercase tracking-[0.2em]">
            Live Session Active
          </span>
        </div>

        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-3 px-2">
            <div className="flex gap-1.5 bg-white/5 px-3 py-2 rounded-full border border-white/5">
              <span className="size-1.5 rounded-full bg-slate-500 animate-bounce"></span>
              <span className="size-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.15s]"></span>
              <span className="size-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.3s]"></span>
            </div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Agent Analyzing...
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      <ChatInput onSend={handleSend} isTyping={isTyping} />
    </>
  );
}
