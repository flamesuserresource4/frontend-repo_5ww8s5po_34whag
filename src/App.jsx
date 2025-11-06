import { useEffect, useState } from "react";
import Header from "./components/Header";
import DeveloperMenu from "./components/DeveloperMenu";
import ChatPanel from "./components/ChatPanel";
import ConsentModal from "./components/ConsentModal";

function App() {
  const [showConsent, setShowConsent] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [showDev, setShowDev] = useState(false);
  const [devUnlocked, setDevUnlocked] = useState(false);
  const [puppetMode, setPuppetMode] = useState(false);

  useEffect(() => {
    // Affiche la modale à l'ouverture du site
    setShowConsent(true);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    setShowConsent(false);
  };

  const handleDecline = () => {
    setAccepted(false);
    setShowConsent(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-900 text-white">
      <Header
        onOpenDeveloper={() => setShowDev(true)}
        devUnlocked={devUnlocked}
        puppetMode={puppetMode}
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Discutez avec EchoIA</h2>
          <p className="text-white/70 text-sm mt-1">
            {puppetMode
              ? "Vous parlez actuellement à la place de l'IA (mode fantôme)."
              : "Écrivez un message ou générez une image."}
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6">
          <ChatPanel puppetMode={puppetMode} />
        </div>

        {!accepted && (
          <p className="mt-4 text-xs text-white/50">
            Mode limité: vous n'avez pas accepté les conditions d'utilisation.
          </p>
        )}
      </main>

      {showConsent && (
        <ConsentModal
          open={showConsent}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}

      {showDev && (
        <DeveloperMenu
          onClose={() => setShowDev(false)}
          onUnlock={() => setDevUnlocked(true)}
          unlockedCode={devUnlocked}
          puppetMode={puppetMode}
          setPuppetMode={setPuppetMode}
        />
      )}
    </div>
  );
}

export default App;
