import React from 'react';

export function DetalhesEvento({ evento, onVoltar, onEditar, onExcluir }) {
  const formatarDataBrasil = (dataString) => {
    if (!dataString) return '';
    if (dataString.includes('/')) return dataString;
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="login-card" style={{ maxWidth: '500px', width: '100%' }}>
      <div className="login-header">
        <h2>Detalhes do Evento</h2>
        <p>Informações completas cadastradas</p>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.03)', padding: '20px', borderRadius: '12px', margin: '20px 0', border: '1px solid rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#C49C74' }}>{evento.nome}</h3>
        <p style={{ margin: '6px 0' }}><strong>Decoração:</strong> {evento.decoracao || 'Não informada'}</p>
        <p style={{ margin: '6px 0' }}><strong>Categoria:</strong> {evento.categoria || 'Não informada'}</p>
        <p style={{ margin: '6px 0' }}>📍 <strong>Local:</strong> {evento.localizacao || 'Não informado'}</p>
        <p style={{ margin: '6px 0' }}>📅 <strong>Data:</strong> {formatarDataBrasil(evento.data)}</p>
        <p style={{ margin: '6px 0' }}>⏰ <strong>Horário:</strong> {evento.horarioInicio || '--:--'} às {evento.horarioFim || '--:--'}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => onEditar(evento)} style={{ flex: 1, padding: '10px', background: '#3b82f6', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Editar Evento
        </button>
        <button onClick={() => onExcluir(evento.id)} style={{ flex: 1, padding: '10px', background: '#ef4444', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Excluir Evento
        </button>
      </div>

      <button onClick={onVoltar} style={{ width: '100%', marginTop: '12px', padding: '10px', background: '#666', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Voltar para o Painel
      </button>
    </div>
  );
}