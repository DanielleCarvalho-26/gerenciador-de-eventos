import React, { useState } from 'react';
import './Login.css';

function Login({ irParaCadastro }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Tentando logar com:", email, senha);
  };

  return (
    <section className="login-card" aria-label="Área de Autenticação do Administrador">
      <div className="login-header">
        <h1>Bem-vindo ao Gerenciador de Eventos</h1>
        <p>Acesse sua conta para gerenciar seus eventos</p>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <label htmlFor="email">E-mail do Administrador</label>
          <input 
            id="email"
            type="email" 
            placeholder="seu@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-label="Digite o e-mail do administrador"
            required 
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input 
            id="senha"
            type="password" 
            placeholder="Digite sua senha" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            aria-required="true"
            aria-label="Digite a sua senha de acesso"
            required 
          />
        </div>

        <div className="actions-group">
          <label className="remember-me">
            <input type="checkbox" aria-label="Lembrar meus dados de acesso neste navegador" /> Gravar Senha
          </label>
          <a href="#forgot" className="forgot-password" aria-label="Link para recuperar senha esquecida">Esqueceu a senha?</a>
        </div>

        <button type="submit" className="btn-submit" aria-label="Botão para entrar no sistema de gerenciamento">Entrar</button>
      </form>

      <div className="register-redirect">
        <p>Não tem uma conta?</p>
        <button type="button" onClick={irParaCadastro} className="btn-register-link" aria-label="Ir para a tela de cadastro de nova conta">
          Cadastre-se
        </button>
      </div>
    </section>
  );
}

export default Login;