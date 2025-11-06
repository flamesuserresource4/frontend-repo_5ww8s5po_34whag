import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

export default function ImageGenerator({ onGenerated }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const seed = encodeURIComponent(prompt.trim().slice(0, 30).replace(/\s+/g, "-")) + "-" + Math.floor(Math.random() * 10000);
    const url = `https://picsum.photos/seed/${seed}/768/432`;
    onGenerated(url);
    setLoading(false);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
      <div className="flex items-center gap-2 text-white">
        <ImagePlus size={18} />
        <h3 className="font-medium">Générateur d'images</h3>
      </div>
      <div className="flex items-center gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Décris l'image à créer…"
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-3 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-60 text-white inline-flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <ImagePlus size={18} />}
          Générer
        </button>
      </div>
    </div>
  );
}
