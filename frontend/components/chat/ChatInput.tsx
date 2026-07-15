"use client";

import React, { useState } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  isTyping: boolean;
  onHint: (draft: string) => void;
  canHint: boolean;
  hintLoading: boolean;
  initialValue?: string;
}

export default function ChatInput({
  onSend,
  isTyping,
  onHint,
  canHint,
  hintLoading,
  initialValue = "",
}: ChatInputProps) {
  const [inputText, setInputText] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    onSend(inputText);
    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative glass-card rounded-3xl p-2 shadow-xl border-primary/30 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <textarea
          className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none p-4 pr-16 rounded-2xl text-[15px] text-on-surface min-h-[72px] max-h-32 resize-none placeholder:text-on-surface-variant/60"
          placeholder="Type your leadership response…"
          rows={2}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={isTyping || !inputText.trim()}
          aria-label="Send response"
          className="absolute right-3 bottom-3 w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center hover:shadow-lg hover:bg-primary/90 transition-all active:scale-95 shadow-md disabled:opacity-50 group"
        >
          <span className="material-symbols-outlined group-hover:translate-x-0.5 transition-transform">
            send
          </span>
        </button>
      </div>

      <div className="mt-2 flex justify-between items-center px-1">
        <button
          type="button"
          onClick={canHint ? () => onHint(inputText) : undefined}
          disabled={!canHint || hintLoading}
          title={canHint ? "Get a Mentor's Tip" : "Send a message first"}
          className={`flex items-center gap-1.5 text-sm font-bold transition-opacity ${
            canHint ? "text-primary hover:opacity-80" : "text-on-surface-variant/40 cursor-not-allowed"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {hintLoading ? "progress_activity" : "psychology"}
          </span>
          {hintLoading ? "Thinking…" : "Get a Mentor's Tip"}
        </button>
        <span className="text-[11px] text-on-surface-variant/70 font-medium hidden sm:block">
          Enter to send · Shift+Enter for a new line
        </span>
      </div>
    </form>
  );
}
