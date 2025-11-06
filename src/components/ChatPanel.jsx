import { useEffect, useRef, useState } from "react";
import { Send, Image as ImageIcon, User, Bot } from "lucide-react";

export default function ChatPanel({ puppetMode }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Salut ! Je suis EchoIA. Pose-moi une question ou demande une image." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fakeAIResponse = async (text) => {
    // Simule une réponse IA côté client
    await new Promise((r) => setTimeout(r, 700));
    return `🤖 Réponse: ${text.split("").reverse().join("")}`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: puppetMode ? "assistant" : "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    if (!puppetMode) {
      setLoading(true);
      const reply = await fakeAIResponse(userMsg.content);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    setGeneratingImage(true);
    // Utilise une image générée via un service libre (placeholder) côté client
    await new Promise((r) => setTimeout(r, 900));
    const seed = Math.floor(Math.random() * 100000);
    const url = `https://picsum.photos/seed/${seed}/512/320`;
    setMessages((m) => [
      ...m,
      { role: puppetMode ? "assistant" : "user", content: "[Image demandée]" },
      { role: "assistant", content: `IMG:${url}` },
    ]);
    setGeneratingImage(false);
  };

  return (
    <div className="flex flex-col h-[70vh] rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex items-start gap-3 ${m.role === "assistant" ? "" : "flex-row-reverse"}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${m.role === "assistant" ? "bg-indigo-600/30 text-indigo-100" : "bg-emerald-600/30 text-emerald-100"}`}>
              {m.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed border ${m.role === "assistant" ? "bg-indigo-600/10 border-indigo-500/20 text-white" : "bg-emerald-600/10 border-emerald-500/20 text-white"}`}>
              {m.content.startsWith("IMG:") ? (
                <img src={m.content.slice(4)} alt="Générée" className="rounded-lg" />
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-white/60 text-sm">L'IA rédige une réponse…</div>
        )}
        <div ref={endRef} />
      </div>
      <div className="border-t border-white/10 p-3 flex items-center gap-2">
        <button
          onClick={handleGenerateImage}
          disabled={generatingImage}
          className="px-3 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-60 text-white inline-flex items-center gap-2"
        >
          <ImageIcon size={18} />
          {generatingImage ? "Génération…" : "Image"}
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={puppetMode ? "Vous parlez en tant qu'IA…" : "Écrire un message…"}
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={handleSend} className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center gap-2">
          <Send size={18} />
          Envoyer
        </button>
      </div>
    </div>
  );
}
