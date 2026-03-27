import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const prodRes = await api.get(`/produtos/${id}`);
        setProduct(prodRes.data);
        
        const payRes = await api.get('/payments/');
        setPayments(payRes.data);
      } catch (error) {
        setMessage('Erro ao carregar os dados do produto.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleBuy = async () => {
    if (!selectedPayment) {
      setMessage('Por favor, selecione uma forma de pagamento.');
      return;
    }
    try {
      await api.post('/orders/', {
        product_id: product.id,
        product_title: product.title,
        total_price: product.price
      });
      alert('Compra realizada com sucesso!');
      navigate('/profile');
    } catch (error) {
      setMessage('Erro ao processar a compra.');
    }
  };

  if (loading) return <div className="text-center mt-2">Carregando detalhes do produto...</div>;
  if (!product) return <div className="text-center mt-2">Produto não encontrado.</div>;

  return (
    <div className="auth-box" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <img src={product.image} alt={product.title} style={{ width: '100%', maxWidth: '300px', objectFit: 'contain' }} />
      <div style={{ flex: 1 }}>
        <h2>{product.title}</h2>
        <p className="text-gray mb-1">{product.category}</p>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>{product.description}</p>
        <h3 className="product-price">R$ {product.price.toFixed(2)}</h3>
        
        {message && <div className="alert">{message}</div>}

        <div style={{ marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
          <h4>Finalizar Compra</h4>
          {payments.length === 0 ? (
            <p className="text-gray mt-2">Você não possui formas de pagamento. Vá ao seu Perfil para adicionar um cartão.</p>
          ) : (
            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              <select 
                className="input-field" 
                value={selectedPayment} 
                onChange={(e) => setSelectedPayment(e.target.value)}
                style={{ marginBottom: 0 }}
              >
                <option value="">Selecione o cartão...</option>
                {payments.map(p => (
                  <option key={p.id} value={p.id}>{p.card_type} - Final {p.card_number.slice(-4)}</option>
                ))}
              </select>
              <button className="btn btn-primary btn-auto" onClick={handleBuy}>Comprar</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;