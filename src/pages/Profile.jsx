import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', email: '', address: '' });

  const [cardForm, setCardForm] = useState({ card_name: '', card_number: '', cvv: '', brand: 'Visa', card_type: 'Credito' });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const userRes = await api.get('/users/me');
      setUser(userRes.data);
      setEditForm({ 
        username: userRes.data.username, 
        email: userRes.data.email || '', 
        address: userRes.data.address || '' 
      });
      
      const ordersRes = await api.get('/orders/');
      setOrders(ordersRes.data);

      const payRes = await api.get('/payments/');
      setPayments(payRes.data);
    } catch (error) {
      navigate('/login');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/users/me', editForm);
      setUser(response.data);
      setIsEditing(false);
      setMessage('Dados atualizados com sucesso!');
    } catch (error) {
      setMessage('Erro ao atualizar dados.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Tem certeza? Esta ação apagará todos os seus dados.')) {
      try {
        await api.delete('/users/me');
        localStorage.removeItem('token');
        navigate('/login');
      } catch (error) {
        setMessage('Erro ao deletar conta.');
      }
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      await api.post('/payments/', cardForm);
      setCardForm({ card_name: '', card_number: '', cvv: '', brand: 'Visa', card_type: 'Credito' });
      fetchProfileData();
      setMessage('Cartão adicionado com sucesso!');
    } catch (error) {
      setMessage('Erro ao adicionar cartão.');
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm('Deseja remover este cartão?')) {
      try {
        await api.delete(`/payments/${paymentId}`);
        fetchProfileData();
        setMessage('Cartão removido.');
      } catch (error) {
        setMessage('Erro ao remover cartão.');
      }
    }
  };

  if (!user) return <div className="text-center mt-2">Carregando dados...</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
      
      <div>
        <div className="auth-box mb-1" style={{ maxWidth: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Meus Dados</h2>
            {!isEditing && (
              <button className="btn btn-secondary btn-auto" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }} onClick={() => setIsEditing(true)}>
                Editar Dados Cadastrais
              </button>
            )}
          </div>
          
          {message && <div className="alert">{message}</div>}

          {!isEditing ? (
            <div style={{ lineHeight: '1.8' }}>
              <p><strong>Usuário:</strong> {user.username}</p>
              <p><strong>E-mail:</strong> {user.email || <span className="text-gray">Não informado</span>}</p>
              <p><strong>Endereço de Entrega:</strong> {user.address || <span className="text-gray">Não informado</span>}</p>
              <button className="btn btn-danger mt-2 btn-auto" onClick={handleDeleteAccount}>Encerrar Conta</button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile}>
              <label className="text-gray" style={{ fontSize: '0.9rem' }}>Nome de Usuário</label>
              <input className="input-field" value={editForm.username} onChange={e => setEditForm({...editForm, username: e.target.value})} required />
              
              <label className="text-gray" style={{ fontSize: '0.9rem' }}>E-mail</label>
              <input className="input-field" type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
              
              <label className="text-gray" style={{ fontSize: '0.9rem' }}>Endereço Completo</label>
              <input className="input-field" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} />
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
              </div>
            </form>
          )}
        </div>

        <div className="auth-box" style={{ maxWidth: '100%' }}>
          <h2>Formas de Pagamento</h2>
          {payments.length === 0 ? <p className="text-gray mb-1">Nenhum cartão cadastrado.</p> : (
            <ul style={{ marginBottom: '1.5rem', listStyle: 'none', padding: 0 }}>
              {payments.map(p => (
                <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <strong>{p.brand}</strong> ({p.card_type})<br/>
                    <span className="text-gray" style={{ fontSize: '0.9rem' }}>{p.card_name} • Final {p.card_number.slice(-4)}</span>
                  </div>
                  <button onClick={() => handleDeletePayment(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' }}>
                    Excluir
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          <form onSubmit={handleAddPayment} style={{ borderTop: payments.length > 0 ? '1px solid #e2e8f0' : 'none', paddingTop: '1rem' }}>
            <h4>Adicionar Novo Cartão</h4>
            <input className="input-field" placeholder="Nome impresso no cartão" value={cardForm.card_name} onChange={e => setCardForm({...cardForm, card_name: e.target.value})} required />
            <input className="input-field" placeholder="Número do Cartão" value={cardForm.card_number} onChange={e => setCardForm({...cardForm, card_number: e.target.value})} required />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input className="input-field" placeholder="CVV" value={cardForm.cvv} onChange={e => setCardForm({...cardForm, cvv: e.target.value})} maxLength="4" required style={{ flex: 1 }} />
              <select className="input-field" value={cardForm.brand} onChange={e => setCardForm({...cardForm, brand: e.target.value})} style={{ flex: 2 }}>
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Elo">Elo</option>
                <option value="Amex">American Express</option>
              </select>
            </div>
            
            <select className="input-field" value={cardForm.card_type} onChange={e => setCardForm({...cardForm, card_type: e.target.value})}>
              <option value="Credito">Crédito</option>
              <option value="Debito">Débito</option>
            </select>
            <button type="submit" className="btn btn-primary">Salvar Cartão</button>
          </form>
        </div>
      </div>

      <div className="auth-box" style={{ maxWidth: '100%', height: 'fit-content' }}>
        <h2>Meus Pedidos</h2>
        {orders.length === 0 ? <p className="text-gray">Você ainda não fez nenhuma compra.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {orders.map(o => (
              <li key={o.id} style={{ borderBottom: '1px solid #e2e8f0', padding: '1.2rem 0' }}>
                <p className="text-gray" style={{ fontSize: '0.8rem', marginBottom: '0.3rem' }}>Pedido #{o.id}</p>
                <p>
                  <Link to={`/product/${o.product_id}`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                    {o.product_title}
                  </Link>
                </p>
                <p className="product-price" style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem' }}>
                  R$ {o.total_price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default Profile;