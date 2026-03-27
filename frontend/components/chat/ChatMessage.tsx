import React from "react";
import { Message } from "./types";

interface ChatMessageProps {
  msg: Message;
}

export default function ChatMessage({ msg }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
      {msg.role === "agent" && (
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-sm w-10 shrink-0 border border-white/20 filter grayscale"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrZdyO2pJqHx2_FjwpPoNGwWsVD-3mLLzd_Lr4XsRcwoImyj8H_cL0IcVdYMa_7b72jyEhDx8bATF9U_xCL8qTptAmQPFdR_0emTC3anHGCakK6ut2yjG3HaeRZ8qpkN3-yBpPLyyfNhwvbkEf-adsgQWmY1-AG2oEXmkRlUwD843MobJ58SSRg6RbAPPjeYuCLKn_HzRf2YyR4fzSvAMog0u8MxPQntqBGayFubQeUBV6OCub5JquPOzGOIix81pITlcUadN8ElWY")',
          }}
        ></div>
      )}

      <div className={`flex flex-1 flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
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
  );
}
