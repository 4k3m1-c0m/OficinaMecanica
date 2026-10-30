import { Link } from 'react-router-dom';
import { ArrowRight, Camera, ClipboardCheck, CarFront, Plus } from 'lucide-react';
import { useCheckins } from '../context/CheckinContext.jsx';
import './Pages.css';

export default function Inicio() {
  const { registros } = useCheckins();
  return (
    <div>
      <section className="welcome">
        <div>
          <span className="eyebrow">PAINEL PRINCIPAL</span>
          <h1>Bem-vindo à OficinaPro</h1>
          <p>Organize a entrada dos veículos e registre as condições de cada atendimento.</p>
        </div>
        <Link className="primary-button" to="/checkin"><Plus size={18}/> Novo check-in</Link>
      </section>

      <section className="stats-grid">
        <article className="stat-card"><span className="stat-icon"><CarFront/></span><small>Veículos registrados</small><strong>{registros.length}</strong></article>
        <article className="stat-card"><span className="stat-icon"><ClipboardCheck/></span><small>Check-ins concluídos</small><strong>{registros.length}</strong></article>
        <article className="stat-card"><span className="stat-icon"><Camera/></span><small>Registros com foto</small><strong>{registros.filter(r => r.foto).length}</strong></article>
      </section>

      <section className="welcome-card">
        <div className="welcome-symbol"><Camera size={30}/></div>
        <div><h2>Check-in completo do veículo</h2><p>Registre cliente, placa, modelo, nível do tanque, lataria e uma foto do veículo na chegada.</p></div>
        <Link to="/checkin" className="text-link">Começar <ArrowRight size={17}/></Link>
      </section>

      <section className="section-heading"><div><h2>Últimos registros</h2><p>Confira os check-ins mais recentes.</p></div><Link to="/historico">Ver histórico</Link></section>
      {registros.length === 0 ? <div className="empty-state">Ainda não há veículos registrados. Crie seu primeiro check-in.</div> :
        <div className="recent-list">{registros.slice(0,3).map(r=><div className="recent-row" key={r.id}><div><strong>{r.modelo}</strong><small>{r.placa} • {r.cliente}</small></div><span>{r.data}</span></div>)}</div>}
    </div>
  );
}
