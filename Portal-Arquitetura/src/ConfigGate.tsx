import { lazy, Suspense } from "react";

const REQUIRED_VARS = [
  "VITE_SOFIA_WEBHOOK_URL",
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY",
] as const;

function getMissingVars(): string[] {
  return REQUIRED_VARS.filter((key) => {
    const value = import.meta.env[key];
    return !value || value.includes("PLACEHOLDER");
  });
}

const App = lazy(() => import("./App").then((m) => ({ default: m.App })));

/**
 * Evita montar o app (e portanto o client Supabase / sofiaApi) antes de
 * confirmar que as env vars necessárias existem — sem isso a tela fica em
 * branco com só um erro no console.
 */
export function ConfigGate() {
  const missing = getMissingVars();

  if (missing.length > 0) {
    return (
      <div className="config-gate">
        <h1>Configuração pendente</h1>
        <p>
          Defina as variáveis abaixo em um arquivo <code>.env</code> na raiz do
          projeto (veja <code>.env.example</code>):
        </p>
        <ul>
          {missing.map((key) => (
            <li key={key}>
              <code>{key}</code>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  );
}
