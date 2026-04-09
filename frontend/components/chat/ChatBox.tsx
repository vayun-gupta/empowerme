"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { Message } from "./types";
import { createSession, sendToAdversary, ConversationTurn } from "@/lib/api";

const SCENARIO_ID = 1; // default scenario; will be dynamic once preview page passes it

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
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [history, setHistory] = useState<ConversationTurn[]>([
    { role: "adversary", content: "Your performance has been strong, particularly in measurable outputs. However, leadership roles often require a broader institutional presence and visibility across the department." },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    createSession(SCENARIO_ID).then(setSessionId).catch(console.error);
  }, []);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: "Sent just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const updatedHistory: ConversationTurn[] = [...history, { role: "user", content: text }];

    try {
      const sid = sessionId ?? (await createSession(SCENARIO_ID));
      if (!sessionId) setSessionId(sid);

      const response = await sendToAdversary(sid, SCENARIO_ID, text, updatedHistory);

      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: response.adversary_message,
        timestamp: "Delivered just now",
      };
      setMessages((prev) => [...prev, agentMsg]);
      setHistory([...updatedHistory, { role: "adversary", content: response.adversary_message }]);
    } catch (err) {
      console.error("Adversary API error:", err);
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: "I'm having trouble responding right now. Please try again.",
        timestamp: "Delivered just now",
      };
      setMessages((prev) => [...prev, agentMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
      <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 flex flex-col gap-4" id="chat-thread">
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

      <div className="shrink-0 w-full px-4 md:px-6 pb-6 pt-2 bg-gradient-to-t from-white to-white/0">
        <ChatInput onSend={handleSend} isTyping={isTyping} />
      </div>
    </div>
  );
}
