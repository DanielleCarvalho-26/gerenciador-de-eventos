import React, { useState, useEffect } from 'react';

export function FormularioEvento({ eventoParaEditar, onSalvar, onVoltar }) {
  const [nome, setNome] = useState('');
  const [decoracao, setDecoracao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [data, setData] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');

  useEffect(() => {
    if (eventoParaEditar) {
      setNome(eventoParaEditar.nome || eventoParaEditar.titulo || '');
      setDecoracao(eventoParaEditar.decoracao || '');
      setCategoria(eventoParaEditar.categoria || '');
      setLocalizacao(eventoParaEditar.localizacao || '');
      setData(eventoParaEditar.data || '');
      setHorarioInicio(eventoParaEditar.horarioInicio || '');
      setHorarioFim(eventoParaEditar.horarioFim || '');
    }
  }, [eventoParaEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventoData = {
      id: eventoParaEditar ? eventoParaEditar.id : undefined,
      nome, // Certifique-se de que no Java o atributo chama 'nome'
      decoracao,
      categoria,
      localizacao,
      data,
      horarioInicio,
      horarioFim
    };
    onSalvar(eventoData);
  };

  return (
    <div className="login-card" style={{ width: '100%', maxWidth: '500px' }}>
      <div className="login-header">
        <h2>{eventoParaEditar ? 'Editar Evento' : 'Novo Evento'}</h2>
        <p>Preencha os dados do evento</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Nome do Evento</label>
          <input 
            type="text" 
            required 
            placeholder="Ex: Aniversário" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Decoração</label>
          <input 
            type="text" 
            placeholder="Ex: Floral" 
            value={decoracao} 
            onChange={(e) => setDecoracao(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Categoria</label>
          <input 
            type="text" 
            placeholder="Ex: Social" 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Local</label>
          <input 
            type="text" 
            placeholder="Ex: Salão Principal" 
            value={localizacao} 
            onChange={(e) => setLocalizacao(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Data</label>
          <input 
            type="date" 
            required 
            value={data} 
            onChange={(e) => setData(e.target.value)} 
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="input-group" style={{ flex: 1 }}>
            <label>Início</label>
            <input 
              type="time" 
              required 
              value={horarioInicio} 
              onChange={(e) => setHorarioInicio(e.target.value)} 
            />
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <label>Fim</label>
            <input 
              type="time" 
              required 
              value={horarioFim} 
              onChange={(e) => setHorarioFim(e.target.value)} 
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <button type="submit" className="btn-submit" style={{ flex: 1 }}>Salvar Evento</button>
          <button type="button" onClick={onVoltar} style={{ flex: 1, background: '#666', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Voltar</button>
        </div>
      </form>
    </div>
  );
}