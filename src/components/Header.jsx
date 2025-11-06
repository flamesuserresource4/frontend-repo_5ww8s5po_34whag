import { Settings, Bot, MessageSquare } from "lucide-react";

export default function Header({ onOpenDeveloper, devUnlocked, puppetMode }) {
  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-r from-indigo-600/10 via-fuchsia-500/10 to-cyan-500/10 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
            <Bot className="text-indigo-300" size={22} />
          </div>
          <div>
            <h1 className="text-white font-semibold leading-tight">EchoIA</h1>
            <p className="text-xs text-white/60 -mt-0.5 flex items-center gap-1">
              <MessageSquare size={14} />
              Parlez, créez, explorez
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {puppetMode && (
            <span className="text-xs px-2 py-1 rounded-md bg-amber-500/20 text-amber-200 border border-amber-500/30">
              Mode fantôme actif
            </span>
          )}
          {devUnlocked && (
            <span className="text-xs px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">
              Dev débloqué
            </span>
          )}
          <button
            onClick={onOpenDeveloper}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-colors"
          >
            <Settings size={18} />
            Menu développeur
          </button>
        </div>
      </div>
    </header>
  );
}
