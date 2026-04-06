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
    }, Math.floor(Math.random() * (1500 - 800 + 1)) + 800);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto px-4 py-8 space-y-10 max-w-2xl mx-auto w-full" id="chat-thread">
        <div className="flex flex-col items-center pb-4">
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200 uppercase tracking-[0.2em]">
            Live Session Active
          </span>
        </div>

        {messages.map((msg) => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}

        {isTyping && (
          <div className="flex flex-col items-start gap-1.5 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                Adversary Agent
              </p>
              <span className="size-1.5 rounded-full bg-red-400"></span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none border border-slate-100 border-l-[3px] border-l-red-500 px-5 py-4 shadow-sm w-[80px] h-[52px] flex items-center justify-center">
              <div className="flex gap-1.5 items-center justify-center translate-y-[-2px]">
                <span className="size-1.5 rounded-full bg-slate-300 animate-bounce"></span>
                <span className="size-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="size-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.3s]"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      <ChatInput onSend={handleSend} isTyping={isTyping} />
    </>
  );
}
