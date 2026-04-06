import React from "react";
import { Message } from "./types";

interface ChatMessageProps {
  msg: Message;
}

export default function ChatMessage({ msg }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === "user" ? "justify-end" : ""}`}>
      {msg.role === "agent" && (
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-sm w-10 shrink-0 border border-slate-200"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrZdyO2pJqHx2_FjwpPoNGwWsVD-3mLLzd_Lr4XsRcwoImyj8H_cL0IcVdYMa_7b72jyEhDx8bATF9U_xCL8qTptAmQPFdR_0emTC3anHGCakK6ut2yjG3HaeRZ8qpkN3-yBpPLyyfNhwvbkEf-adsgQWmY1-AG2oEXmkRlUwD843MobJ58SSRg6RbAPPjeYuCLKn_HzRf2YyR4fzSvAMog0u8MxPQntqBGayFubQeUBV6OCub5JquPOzGOIix81pITlcUadN8ElWY")',
          }}
        ></div>
      )}

      <div className={`flex flex-1 flex-col gap-1.5 ${msg.role === "user" ? "items-end" : "items-start"}`}>
        {msg.role === "agent" ? (
          <div className="flex items-center gap-2 mb-1">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">
              Adversary Agent
            </p>
            <span className="size-1.5 rounded-full bg-red-400"></span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-1">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              Leadership Response
            </p>
          </div>
        )}

        {msg.role === "agent" ? (
          <div className="bg-white rounded-2xl rounded-tl-none border border-slate-100 border-l-[3px] border-l-red-500 px-5 py-4 text-[14px] font-normal leading-relaxed tracking-tight shadow-sm w-[95%] sm:w-[85%]">
            {msg.id === "message-init" && (
              <div className="mb-3 inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold uppercase text-slate-500 tracking-wider">
                <span className="material-symbols-outlined text-[12px] text-red-500">bolt</span>{" "}
                Evaluation Reframing
              </div>
            )}
            <p className="text-slate-800">{msg.content}</p>
          </div>
        ) : (
          <div className="bg-[#f0f7ff] border border-blue-100/50 rounded-2xl rounded-tr-none px-5 py-4 text-[14px] font-normal leading-relaxed text-slate-800 max-w-[90%] shadow-sm">
            {msg.content}
          </div>
        )}

        <p className="text-slate-400 text-[10px] font-medium mt-0.5">
          {msg.timestamp}
        </p>
      </div>

      {msg.role === "user" && (
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0 border border-blue-200"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtxH-VjGPC9lW5Wb9w8dZyeaAk6HiG6-LJSqF79VvPCK_lwSHSJiAyI3ljGm2SJwgoScbmWBaWrFRtLNLS04G0xXgOsuLRJXhvvInQwG6BprDhiOb7dnpk5H6Xe9uPmVpNhFcdblFoSl6MfCJDoffakFQLGlamgYXxfMRCInFOA9KwogCLeHM8aiw-UikZIm_Y1vbv3UOhBIH1AfkjRGgYWQNf27EU1syrcHb7XLeCl-cTN_xgGtk5bcU9nid2K87FUPArLxguNGHn")',
          }}
        ></div>
      )}
    </div>
  );
}
