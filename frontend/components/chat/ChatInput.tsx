"use client";

import React, { useState } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  isTyping: boolean;
}

export default function ChatInput({ onSend, isTyping }: ChatInputProps) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    
    onSend(inputText);
    setInputText("");
  };

  return (
    <footer className="sticky bottom-0 w-full p-4 bg-[#0a0c12]/80 backdrop-blur-xl border-t border-white/5 pb-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
        <div className="relative group">
          <textarea
            className="w-full rounded-2xl border-white/10 bg-white/5 p-4 pr-12 text-sm text-white transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-neon-blue neon-border resize-none focus:outline-none"
            placeholder="Craft your strategic response..."
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="absolute bottom-3 right-3 flex flex-col items-center">
            <span className="text-[9px] font-black text-slate-600">
              {inputText.length}/280
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              className="p-3 rounded-xl glass text-slate-400 hover:text-neon-blue hover:border-neon-blue/40 transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            </button>
            <button
              type="button"
              className="p-3 rounded-xl glass text-slate-400 hover:text-neon-blue hover:border-neon-blue/40 transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">history</span>
            </button>
          </div>
          <button
            type="submit"
            disabled={isTyping || !inputText.trim()}
            className="w-auto px-8 py-3 flex items-center justify-center gap-2 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-[0.98] transition-all border border-white/10 disabled:opacity-50"
          >
            <span>Submit Response</span>
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </form>
      <div className="mt-6 flex justify-center">
        <div className="w-32 h-1.5 bg-white/10 rounded-full"></div>
      </div>
    </footer>
  );
}
