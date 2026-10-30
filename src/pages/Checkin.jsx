import { useState } from 'react';
import { Camera, CarFront, CheckCircle2, ImagePlus } from 'lucide-react';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useNavigate } from 'react-router-dom';
import { useCheckins } from '../context/CheckinContext.jsx';
import './Pages.css';

const inicial = { cliente:'', placa:'', modelo:'', tanque:'3/4', lataria:'Boa', observacoes:'' };

export default function Checkin() {
  const [form, setForm] = useState(inicial);
  const [foto, setFoto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { adicionarRegistro } = useCheckins();
  const navigate = useNavigate();

  function alterar(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  async function capturarFoto() {
    try {
      setCarregando(true); setMensagem(''); setErro('');
      const imagem = await CapacitorCamera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });
      setFoto(imagem.webPath || '');
      setMensagem('Imagem selecionada com sucesso.');
    } catch (e) {
      console.log('Captura cancelada ou não realizada:', e);
      setMensagem('Ação cancelada. Você pode tentar novamente.');
    } finally {
      setCarregando(false);
    }
  }

  function salvar(e) {
    e.preventDefault();
    setErro('');
    if (!form.cliente.trim() || !form.placa.trim() || !form.modelo.trim()) {
      setErro('Preencha nome do cliente, placa e modelo do veículo.');
      return;
    }
    if (!foto) {
      setErro('Registre uma foto do veículo antes de concluir.');
      return;
    }
    const registro = {
      ...form,
      id: Date.now(),
      foto,
      data: new Date().toLocaleString('pt-BR'),
      status: 'Concluído'
    };
    adicionarRegistro(registro);
    navigate('/historico');
  }

  return (
    <div>
      <div className="page-title"><span className="eyebrow">ATENDIMENTO</span><h1>Novo check-in</h1><p>Preencha os dados e registre as condições do veículo na chegada.</p></div>
      <form className="form-layout" onSubmit={salvar}>
        <section className="form-card">
          <div className="form-title"><span className="section-icon"><CarFront/></span><div><h2>Identificação do veículo</h2><p>Informe os dados do cliente e do automóvel.</p></div></div>
          <div className="field-grid">
            <label>Nome do cliente<input name="cliente" value={form.cliente} onChange={alterar} placeholder="Ex.: João Silva"/></label>
            <label>Placa<input name="placa" value={form.placa} onChange={alterar} placeholder="ABC1D23" maxLength="7"/></label>
            <label className="full-field">Modelo do veículo<input name="modelo" value={form.modelo} onChange={alterar} placeholder="Ex.: Fiat Argo 2024"/></label>
          </div>
        </section>

        <section className="form-card">
          <div className="form-title"><span className="section-icon"><CheckCircle2/></span><div><h2>Condições de entrada</h2><p>Registre o nível do tanque e a situação da lataria.</p></div></div>
          <div className="field-grid">
            <label>Nível do tanque<select name="tanque" value={form.tanque} onChange={alterar}><option>Vazio</option><option>1/4</option><option>1/2</option><option>3/4</option><option>Cheio</option></select></label>
            <label>Estado da lataria<select name="lataria" value={form.lataria} onChange={alterar}><option>Boa</option><option>Pequenos riscos</option><option>Amassados</option><option>Danificada</option></select></label>
            <label className="full-field">Observações<textarea name="observacoes" value={form.observacoes} onChange={alterar} rows="3" placeholder="Descreva riscos, amassados ou outros detalhes..."/></label>
          </div>
        </section>

        <section className="form-card">
          <div className="form-title"><span className="section-icon"><Camera/></span><div><h2>Foto do veículo</h2><p>Use a câmera ou escolha uma imagem da galeria.</p></div></div>
          <div className="photo-box">
            {foto ? <img className="photo-preview" src={foto} alt="Pré-visualização do veículo"/> :
              <div className="photo-empty"><ImagePlus size={36}/><strong>Nenhuma foto adicionada</strong><span>A foto será exibida aqui após a captura.</span></div>}
            <button type="button" className="secondary-button" onClick={capturarFoto} disabled={carregando}><Camera size={18}/>{carregando ? 'Abrindo...' : 'Tirar Foto / Galeria'}</button>
            {foto && <button type="button" className="remove-button" onClick={()=>setFoto('')}>Remover foto</button>}
          </div>
          {mensagem && <p className="feedback">{mensagem}</p>}
          {erro && <p className="error-feedback">{erro}</p>}
        </section>

        <div className="form-actions"><button type="button" className="outline-button" onClick={()=>{setForm(inicial);setFoto('');setErro('');setMensagem('');}}>Limpar formulário</button><button className="primary-button" type="submit">Concluir check-in</button></div>
      </form>
    </div>
  );
}
