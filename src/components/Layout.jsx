import { NavLink } from 'react-router-dom';
import { Wrench, LayoutDashboard, ClipboardList, PlusCircle } from 'lucide-react';
import { CheckinProvider } from '../context/CheckinContext.jsx';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <CheckinProvider>
      <div className="app-shell">
        <aside className="sidebar">
          <NavLink to="/" className="brand">
            <span className="brand-icon"><Wrench size={22} /></span>
            <span><strong>OficinaPro</strong><small>GESTÃO AUTOMOTIVA</small></span>
          </NavLink>
          <div className="nav-label">MENU PRINCIPAL</div>
          <nav className="nav-links">
            <NavLink to="/" end><LayoutDashboard size={18} /> Início</NavLink>
            <NavLink to="/checkin"><PlusCircle size={18} /> Novo check-in</NavLink>
            <NavLink to="/historico"><ClipboardList size={18} /> Histórico</NavLink>
          </nav>
          <div className="sidebar-bottom">Sistema de check-in<br />Oficina Mecânica</div>
        </aside>
        <div className="main-area">
          <header className="topbar">
            <div className="mobile-brand"><Wrench size={19}/> OficinaPro</div>
            <span>Painel de gestão</span>
            <span className="user-chip">ALUNO 19</span>
          </header>
          <main className="page-content">{children}</main>
        </div>
        <nav className="mobile-nav">
          <NavLink to="/" end><LayoutDashboard size={18}/><span>Início</span></NavLink>
          <NavLink to="/checkin"><PlusCircle size={18}/><span>Check-in</span></NavLink>
          <NavLink to="/historico"><ClipboardList size={18}/><span>Histórico</span></NavLink>
        </nav>
      </div>
    </CheckinProvider>
  );
}
