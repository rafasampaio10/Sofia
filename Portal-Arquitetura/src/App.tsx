import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { LoginPage } from "./auth/LoginPage";
import { Shell } from "./layout/Shell";
import { PdcPage } from "./modules/pdc/PdcPage";
import { BetasPage } from "./modules/betas/BetasPage";
import { ConhecimentoPage } from "./modules/conhecimento/ConhecimentoPage";
import { ContornoPage } from "./modules/contorno/ContornoPage";
import { ChatPage } from "./modules/chat/ChatPage";

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Shell />}>
            <Route index element={<Navigate to="/pdc" replace />} />
            <Route path="/pdc" element={<PdcPage />} />
            <Route path="/betas" element={<BetasPage />} />
            <Route path="/conhecimento" element={<ConhecimentoPage />} />
            <Route path="/contorno" element={<ContornoPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
