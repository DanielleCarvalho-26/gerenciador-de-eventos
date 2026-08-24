import React, { useState } from 'react';

function ModalEvento({ aoFechar, aoSalvar }) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim() || !data.trim()) {
      setErro('Por favor, preencha todos os campos do evento.');
      return;
    }
    aoSalvar({ nome, data });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }} role="dialog" aria-modal="true" aria-label="Janela de criação de novo evento">
      <div className="login-card" style={{ maxWidth: '400px', width: '90%', background: '#ffffff', color: '#333' }}>
        <h2>Novo Evento</h2>
        
        {erro && (
          <div style={{ 
            padding: '8px', 
            marginBottom: '10px', 
            borderRadius: '4px', 
            backgroundColor: '#fee2e2', 
            color: '#991b1b', 
            fontSize: '13px',
            textAlign: 'center'
          }} role="alert">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>
          <div className="input-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="nomeEvento" style={{ display: 'block', marginBottom: '5px' }}>Nome do Evento</label>
            <input 
              id="nomeEvento"
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Digite o nome"
              aria-required="true"
              aria-label="Nome do novo evento"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <div className="input-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="dataEvento" style={{ display: 'block', marginBottom: '5px' }}>Data</label>
            <input 
              id="dataEvento"
              type="date" 
              value={data} 
              onChange={(e) => setData(e.target.value)} 
              aria-required="true"
              aria-label="Data do novo evento"
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn-submit" style={{ flex: 1 }} aria-label="Salvar novo evento">Salvar</button>
            <button 
              type="button" 
              onClick={aoFechar} 
              style={{ flex: 1, background: '#e5e7eb', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              aria-label="Cancelar criação de evento"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEvento;