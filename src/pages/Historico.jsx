import { Link } from 'react-router-dom';
import { ClipboardList, Plus, CarFront } from 'lucide-react';
import { useCheckins } from '../context/CheckinContext.jsx';
import './Pages.css';

export default function Historico() {
  const { registros } = useCheckins();
  return (
    <div>
      <div className="history-heading"><div className="page-title"><span className="eyebrow">ACOMPANHAMENTO</span><h1>Histórico de check-ins</h1><p>Consulte os veículos registrados nesta sessão e neste navegador.</p></div><Link className="primary-button" to="/checkin"><Plus size={18}/> Novo check-in</Link></div>
      {registros.length === 0 ? <div className="empty-state large"><ClipboardList size={38}/><h2>Nenhum registro ainda</h2><p>Quando você concluir um check-in, ele aparecerá nesta tela.</p><Link className="primary-button" to="/checkin">Fazer primeiro check-in</Link></div> :
        <div className="history-grid">{registros.map(r=><article className="history-card" key={r.id}>
          {r.foto ? <img src={r.foto} alt="Veículo"/> : <div className="history-placeholder"><CarFront size={30}/></div>}
          <div className="history-info"><div className="history-top"><strong>{r.modelo}</strong><span className="done-pill">Concluído</span></div>
          <p><b>Placa:</b> {r.placa}</p><p><b>Cliente:</b> {r.cliente}</p><p><b>Tanque:</b> {r.tanque} • <b>Lataria:</b> {r.lataria}</p>
          {r.observacoes && <p><b>Observações:</b> {r.observacoes}</p>}<small>{r.data}</small></div>
        </article>)}</div>}
    </div>
  );
}
