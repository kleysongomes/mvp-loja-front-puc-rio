import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await api.post('/login/', formData);
        
        localStorage.setItem('token', response.data.access_token);
        navigate('/');
      } else {
        await api.post('/users/', { username, password });
        setMessage('Conta criada com sucesso! Faça login.');
        setIsLoginMode(true);
        setPassword('');
      }
    } catch (error) {
      const detail = error.response?.data?.detail;
      
      if (Array.isArray(detail)) {
        setMessage('Erro de validação: Verifique os dados enviados.');
      } else if (typeof detail === 'string') {
        setMessage(detail);
      } else {
        setMessage('Erro na operação. Verifique a conexão.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="text-center">Loja PUC-Rio</h2>
        <p className="text-center text-gray mb-1">
          {isLoginMode ? 'Acesse sua conta para comprar' : 'Crie sua conta'}
        </p>
        
        {message && <div className="alert">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input className="input-field" type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input className="input-field" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary mb-1">
            {isLoginMode ? 'Entrar' : 'Registrar'}
          </button>
        </form>
        
        <button className="btn btn-secondary" onClick={() => { setIsLoginMode(!isLoginMode); setMessage(''); }}>
          {isLoginMode ? 'Criar uma conta' : 'Já tenho conta'}
        </button>
      </div>
    </div>
  );
}

export default Login;