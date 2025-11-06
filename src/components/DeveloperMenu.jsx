import { useState } from "react";
import { Lock, Unlock, ShieldAlert } from "lucide-react";

export default function DeveloperMenu({ onClose, onUnlock, unlockedCode, puppetMode, setPuppetMode }) {
  const [code, setCode] = useState("");
  const correctCode = "2013";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() === correctCode) {
      onUnlock();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-800 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            {unlockedCode ? <Unlock size={18} className="text-emerald-400" /> : <Lock size={18} className="text-white/60" />} 
            Menu développeur
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>

        {!unlockedCode ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <label className="block text-sm text-white/70">Entrer le code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Code"
            />
            <button type="submit" className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white py-2">
              Déverrouiller
            </button>
            <p className="text-xs text-white/50 flex items-center gap-1"><ShieldAlert size={14} /> Conseil: le code est un nombre, année spéciale.</p>
          </form>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm">
              Code accepté. Accès avancé débloqué.
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Mode fantôme</p>
                <p className="text-white/60 text-xs">Parlez à la place de l'IA sans que personne ne le voit.</p>
              </div>
              <button
                onClick={() => setPuppetMode(!puppetMode)}
                className={`px-3 py-1.5 rounded-lg border text-sm ${puppetMode ? "bg-amber-500/20 text-amber-200 border-amber-500/30" : "bg-white/5 text-white/80 border-white/10"}`}
              >
                {puppetMode ? "Actif" : "Inactif"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
