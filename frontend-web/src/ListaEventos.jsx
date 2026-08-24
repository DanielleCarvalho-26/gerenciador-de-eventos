import React from 'react';

export function ListaEventos({ eventos, onVisualizar, onNovo }) {
  // Função para transformar "2026-10-27" em "27/10/2026"
  const formatarDataBrasil = (dataString) => {
    if (!dataString) return '';
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
                {/* Nome principal do evento/pessoa em destaque */}
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{evento.nome}</h3>
                <span style={{ background: '#C49C74', color: '#FFF', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                  {evento.categoria}
                </span>
              </div>
              
              <div style={{ fontSize: '13px', margin: '8px 0', opacity: 0.9 }}>
                <span>📍 <strong>Local:</strong> {evento.localizacao || 'Não informado'}</span> | 
                <span> 📅 <strong>Data:</strong> {formatarDataBrasil(evento.data)}</span> | 
                <span> ⏰ <strong>Horário:</strong> {evento.horarioInicio || '--:--'} às {evento.horarioFim || '--:--'}</span>
              </div>

              {/* Botão de Visualizar que abre os detalhes e as opções de editar/excluir */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button onClick={() => onVisualizar(evento)} style={{ padding: '6px 16px', background: '#3b82f6', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
                  Visualizar
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