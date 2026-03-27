"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "agent" | "user";
  content: string;
  timestamp: string;
}

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
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText,
      timestamp: "Sent just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
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
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "justify-end" : ""
            }`}
          >
            {msg.role === "agent" && (
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-sm w-10 shrink-0 border border-white/20 filter grayscale"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrZdyO2pJqHx2_FjwpPoNGwWsVD-3mLLzd_Lr4XsRcwoImyj8H_cL0IcVdYMa_7b72jyEhDx8bATF9U_xCL8qTptAmQPFdR_0emTC3anHGCakK6ut2yjG3HaeRZ8qpkN3-yBpPLyyfNhwvbkEf-adsgQWmY1-AG2oEXmkRlUwD843MobJ58SSRg6RbAPPjeYuCLKn_HzRf2YyR4fzSvAMog0u8MxPQntqBGayFubQeUBV6OCub5JquPOzGOIix81pITlcUadN8ElWY")',
                }}
              ></div>
            )}

            <div
              className={`flex flex-1 flex-col gap-2 ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              {msg.role === "agent" ? (
                <div className="flex items-center gap-2">
                  <p className="text-white text-[11px] font-black uppercase tracking-widest">
                    Adversary Agent
                  </p>
                  <span className="size-1 rounded-full bg-red-500 animate-pulse"></span>
                </div>
              ) : (
                <p className="text-primary text-[11px] font-bold uppercase tracking-widest">
                  Leadership Response
                </p>
              )}

              {msg.role === "agent" ? (
                <div className="adversary-bubble relative rounded-none border-l-4 border-red-600 px-4 py-4 text-[14px] font-medium leading-relaxed tracking-tight shadow-2xl">
                  {msg.id === "message-init" && (
                    <div className="mb-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/10 border border-black/10 rounded text-[9px] font-black uppercase text-red-700">
                      <span className="material-symbols-outlined text-[12px]">bolt</span>{" "}
                      Evaluation Reframing
                    </div>
                  )}
                  <p className="text-slate-900">{msg.content}</p>
                </div>
              ) : (
                <div className="glass-user rounded-2xl rounded-tr-none px-4 py-3 text-[14px] font-normal leading-relaxed text-slate-200 max-w-[90%] shadow-lg">
                  {msg.content}
                </div>
              )}

              <p className="text-slate-600 text-[10px] font-medium uppercase tracking-tighter">
                {msg.timestamp}
              </p>
            </div>

            {msg.role === "user" && (
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0 border-2 border-primary/30"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtxH-VjGPC9lW5Wb9w8dZyeaAk6HiG6-LJSqF79VvPCK_lwSHSJiAyI3ljGm2SJwgoScbmWBaWrFRtLNLS04G0xXgOsuLRJXhvvInQwG6BprDhiOb7dnpk5H6Xe9uPmVpNhFcdblFoSl6MfCJDoffakFQLGlamgYXxfMRCInFOA9KwogCLeHM8aiw-UikZIm_Y1vbv3UOhBIH1AfkjRGgYWQNf27EU1syrcHb7XLeCl-cTN_xgGtk5bcU9nid2K87FUPArLxguNGHn")',
                }}
              ></div>
            )}
          </div>
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
    </>
  );
}
