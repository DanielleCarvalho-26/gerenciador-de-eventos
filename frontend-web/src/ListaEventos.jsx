import React from 'react';

export function ListaEventos({ eventos, onEditar, onExcluir, onNovo }) {
  // Função para transformar "2026-10-27" em "27/10/2026"
  const formatarDataBrasil = (dataString) => {
    if (!dataString) return '';
    // Se a data já vier com barras ou em outro formato, retorna como está
    if (dataString.includes('/')) return dataString;
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="login-card" style={{ maxWidth: '650px', width: '100%' }}>
      <div className="login-header">
        <h2>Gerenciamento de Eventos</h2>
        <p>Lista de eventos cadastrados no sistema</p>
      </div>

      <button className="btn-submit" onClick={onNovo} style={{ marginBottom: '20px' }}>
        + Criar Novo Evento
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto' }}>
        {eventos && eventos.length > 0 ? (
          eventos.map((evento) => (
            <div key={evento.id} style={{ background: 'rgba(0,0,0,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{evento.titulo}</h3>
                <span style={{ background: '#C49C74', color: '#FFF', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                  {evento.categoria}
                </span>
              </div>
              <p style={{ margin: '4px 0', fontSize: '14px', opacity: 0.8 }}><strong>Decoração:</strong> {evento.decoracao}</p>
              
              <div style={{ fontSize: '13px', margin: '8px 0', opacity: 0.9 }}>
                <span>📍 <strong>Local:</strong> {evento.local}</span> | 
                <span> 📅 <strong>Data:</strong> {formatarDataBrasil(evento.data)}</span> | 
                <span> ⏰ <strong>Horário:</strong> {evento.horaInicio} às {evento.horaFim}</span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => onEditar(evento)} style={{ padding: '6px 14px', background: '#3b82f6', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                  Atualizar
                </button>
                <button onClick={() => onExcluir(evento.id)} style={{ padding: '6px 14px', background: '#ef4444', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>Nenhum evento cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}