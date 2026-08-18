import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const NAV_ITEMS = [
  { to: "/pdc", label: "Abertura de PDC" },
  { to: "/betas", label: "Consulta de Betas" },
  { to: "/conhecimento", label: "Conhecimento da Plataforma" },
  { to: "/contorno", label: "Soluções de Contorno" },
  { to: "/chat", label: "Chat Sofia" },
];

export function Sidebar() {
  const { signOut } = useAuth();

  return (
    <nav className="sidebar">
      <div className="sidebar-title">Portal Sofia</div>
      <ul>
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button className="sidebar-logout" onClick={signOut}>
        Sair
      </button>
    </nav>
  );
}
