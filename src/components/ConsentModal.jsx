import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function ConsentModal({ open, onAccept, onDecline }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative w-full max-w-md mx-auto rounded-2xl border border-white/10 bg-gradient-to-b from-rose-900/60 to-slate-900 p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-rose-500/20 flex items-center justify-center">
            <AlertTriangle className="text-rose-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Urgent: Conditions d'utilisation</h3>
            <p className="text-white/70 text-sm">Conseil: n'acceptez pas les conditions d'utilisation.</p>
          </div>
        </div>
        <div className="mt-4 text-white/80 text-sm space-y-2">
          <p>Pour continuer, choisissez une option:</p>
          <ul className="list-disc list-inside text-white/60">
            <li>Accepter pour démarrer immédiatement.</li>
            <li>Refuser pour tester l'app en mode lecture seule.</li>
          </ul>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={onDecline} className="px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/10">Refuser</button>
          <button onClick={onAccept} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">Accepter</button>
        </div>
      </div>
    </div>
  );
}
