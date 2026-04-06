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
      <form onSubmit={handleSubmit} className="flex flex-col bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden w-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
        <div className="relative group">
          <textarea
            className="w-full bg-transparent p-5 pr-12 text-sm text-slate-900 transition-all placeholder:text-slate-400 resize-none focus:outline-none"
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
        </div>
        
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50 transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            </button>
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-blue-50 transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">history</span>
            </button>
            <div className="h-4 w-px bg-slate-200 mx-2"></div>
            <span className="text-[10px] font-medium text-slate-400">
              {inputText.length}/280 chars
            </span>
          </div>
          <button
            type="submit"
            disabled={isTyping || !inputText.trim()}
            className="px-5 py-2 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium text-sm shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </div>
      </form>
  );
}
