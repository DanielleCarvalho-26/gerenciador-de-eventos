import React, { useState, useEffect } from 'react';
import { FormularioEvento } from './FormularioEvento';
import { ListaEventos } from './ListaEventos';
import './Login.css';

const API_URL = 'http://localhost:8080/api/eventos';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('login');
  const [isDark, setIsDark] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [eventoParaEditar, setEventoParaEditar] = useState(null);
  
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const carregarEventos = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const dados = await response.json();
        setEventos(dados);
      }
    } catch (error) {
      console.error('Erro ao buscar eventos do backend:', error);
    }
  };

  useEffect(() => {
    if (telaAtual === 'painel') {
      carregarEventos();
    }
  }, [telaAtual]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailLogin || !senhaLogin) {
      alert('Por favor, preencha o e-mail e a senha.');
      return;
    }
    setTelaAtual('painel');
  };

  const handleSalvarEvento = async (eventoData) => {
    try {
      const isEdicao = !!eventoData.id && eventos.some(ev => ev.id === eventoData.id);
      
      const dadosParaEnviar = { ...eventoData };
      if (!isEdicao) {
        delete dadosParaEnviar.id;
      }

      const url = isEdicao ? `${API_URL}/${eventoData.id}` : API_URL;
      const metodo = isEdicao ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (response.ok) {
        carregarEventos();
        setTelaAtual('painel');
        setEventoParaEditar(null);
      } else {
        alert('Erro ao salvar o evento no servidor.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  const handleExcluirEvento = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setEventos(eventos.filter(ev => ev.id !== id));
      } else {
        alert('Erro ao excluir o evento.');
      }
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  return (
    <div className={`login-container ${isDark ? 'high-contrast' : ''}`}>
      <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 10 }}>
        <button onClick={toggleTheme} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ccc', background: isDark ? '#333' : '#fff', color: isDark ? '#fff' : '#000', cursor: 'pointer' }}>
          {isDark ? 'Tema Claro' : 'Tema Escuro'}
        </button>
      </div>

      {telaAtual === 'login' && (
        <div className="login-card">
          <div className="login-header">
            <h2>Gerenciamento de Eventos</h2>
            <p>Faça login para acessar o sistema</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>E-mail</label>
              <input 
                type="email" 
                required 
                placeholder="seu@email.com" 
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Senha</label>
              <input 
                type="password" 
                required 
                placeholder="******" 
                value={senhaLogin}
                onChange={(e) => setSenhaLogin(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-submit">Entrar</button>
          </form>
          <div className="register-redirect">
            <span>Não tem uma conta?</span>
            <button className="btn-register-link" onClick={() => setTelaAtual('cadastro')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C49C74' }}>Cadastre-se</button>
          </div>
        </div>
      )}

      {telaAtual === 'cadastro' && (
        <div className="login-card">
          <div className="login-header">
            <h2>Criar Conta</h2>
            <p>Cadastre-se para gerenciar seus eventos</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Conta criada com sucesso!'); setTelaAtual('login'); }} className="login-form">
            <div className="input-group">
              <label>Nome</label>
              <input type="text" required placeholder="Seu nome" />
            </div>
            <div className="input-group">
              <label>E-mail</label>
              <input type="email" required placeholder="seu@email.com" />
            </div>
            <div className="input-group">
              <label>Senha</label>
              <input type="password" required placeholder="******" />
            </div>
            <button type="submit" className="btn-submit">Cadastrar</button>
          </form>
          <div className="register-redirect">
            <span>Já tem uma conta?</span>
            <button className="btn-register-link" onClick={() => setTelaAtual('login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C49C74' }}>Fazer Login</button>
          </div>
        </div>
      )}

      {telaAtual === 'painel' && (
        <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 10px' }}>
            <span style={{ fontWeight: 'bold' }}>Painel de Controle</span>
            <button onClick={() => { setTelaAtual('login'); setEmailLogin(''); setSenhaLogin(''); }} style={{ background: '#ef4444', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
              Sair
            </button>
          </div>
          <ListaEventos 
            eventos={eventos} 
            onNovo={() => { setEventoParaEditar(null); setTelaAtual('form-evento'); }}
            onEditar={(evento) => { setEventoParaEditar(evento); setTelaAtual('form-evento'); }}
            onExcluir={handleExcluirEvento}
          />
        </div>
      )}

      {telaAtual === 'form-evento' && (
        <FormularioEvento 
          eventoParaEditar={eventoParaEditar} 
          onSalvar={handleSalvarEvento} 
          onVoltar={() => { setTelaAtual('painel'); setEventoParaEditar(null); }} 
        />
      )}
    </div>
  );
}