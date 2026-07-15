import React from "react";
import { Message } from "./types";

interface ChatMessageProps {
  msg: Message;
  adversaryLabel?: string;
}

export default function ChatMessage({ msg, adversaryLabel = "Adversary" }: ChatMessageProps) {
  if (msg.role === "coach") {
    return (
      <div className="coach-insight-pill p-4 rounded-2xl flex gap-3 items-start max-w-[92%] mx-auto my-2 shadow-sm animate-in fade-in duration-300">
        <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
          lightbulb
        </span>
        <div className="space-y-1 min-w-0">
          <p className="text-sm text-on-surface leading-relaxed">
            <strong className="text-primary font-bold">
              Mentor Note{typeof msg.coachScore === "number" ? ` · ${msg.coachScore}/100` : ""}:
            </strong>{" "}
            {msg.content}
          </p>
        </div>
      </div>
    );
  }

  if (msg.role === "agent") {
    return (
      <div className="flex flex-col gap-2 items-start max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="flex items-center gap-2 px-1">
          <div className="w-7 h-7 rounded-full bg-secondary-container text-secondary flex items-center justify-center font-bold text-[10px] border border-secondary/20">
            <span className="material-symbols-outlined text-[16px]">person</span>
          </div>
          <span className="text-on-surface-variant font-bold text-[13px]">{adversaryLabel}</span>
        </div>
        <div className="adversary-bubble p-4 px-6 rounded-3xl shadow-sm">
          <p className="text-on-surface leading-relaxed text-[15px]">{msg.content}</p>
        </div>
        <p className="text-on-surface-variant/60 text-[10px] font-medium px-1">{msg.timestamp}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-end max-w-[85%] self-end animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-2 flex-row-reverse px-1">
        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px] shadow-md border border-white/20">
          <span className="material-symbols-outlined text-[16px]">person</span>
        </div>
        <span className="text-on-surface-variant font-bold text-[13px]">You</span>
      </div>
      <div className="user-bubble p-4 px-6 rounded-3xl shadow-lg">
        <p className="text-white leading-relaxed text-[15px]">{msg.content}</p>
      </div>
      <p className="text-on-surface-variant/60 text-[10px] font-medium px-1">{msg.timestamp}</p>
    </div>
  );
}
