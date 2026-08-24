import React, { useState } from 'react';
import './Login.css';

function Cadastro({ onVoltarLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const handleCadastro = (e) => {
    e.preventDefault();
    
    if (senha !== confirmaSenha) {
      setMensagem({ texto: 'As senhas não coincidem. Verifique e tente novamente.', tipo: 'erro' });
      return;
    }

    setMensagem({ texto: 'Cadastro realizado com sucesso!', tipo: 'sucesso' });
    console.log("Cadastrando:", { nome, email, senha });
  };

  return (
    <section className="login-card" aria-label="Área de Cadastro de Novo Administrador">
      <div className="login-header">
        <h1>Criar Conta</h1>
        <p>Preencha os dados para se cadastrar no sistema</p>
      </div>

      {mensagem.texto && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px', 
          borderRadius: '4px', 
          backgroundColor: mensagem.tipo === 'erro' ? '#fee2e2' : '#d1fae5',
          color: mensagem.tipo === 'erro' ? '#991b1b' : '#065f46',
          fontSize: '14px',
          textAlign: 'center'
        }} role="alert">
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={handleCadastro} className="login-form">
        <div className="input-group">
          <label htmlFor="nomeCadastro">Nome Completo</label>
          <input 
            id="nomeCadastro"
            type="text" 
            placeholder="Seu nome" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            aria-required="true"
            aria-label="Digite o seu nome completo"
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="emailCadastro">E-mail</label>
          <input 
            id="emailCadastro"
            type="email" 
            placeholder="seu@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-label="Digite o seu endereço de e-mail"
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="senhaCadastro">Senha</label>
          <input 
            id="senhaCadastro"
            type="password" 
            placeholder="Crie uma senha forte" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            aria-required="true"
            aria-label="Crie uma senha de acesso"
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmaSenhaCadastro">Confirmar Senha</label>
          <input 
            id="confirmaSenhaCadastro"
            type="password" 
            placeholder="Digite a senha novamente" 
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            aria-required="true"
            aria-label="Confirme a sua senha de acesso"
            required 
          />
        </div>

        <button type="submit" className="btn-submit" aria-label="Botão para finalizar o cadastro de nova conta">Cadastrar</button>
      </form>

      <div className="register-redirect">
        <p>Já possui uma conta?</p>
        <button type="button" onClick={onVoltarLogin} className="btn-register-link" aria-label="Voltar para a tela de login">
          Entrar
        </button>
      </div>
    </section>
  );
}

export default Cadastro;