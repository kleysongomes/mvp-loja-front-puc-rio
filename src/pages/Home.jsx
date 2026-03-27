import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../services/api';

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/produtos/');
        setAllProducts(response.data.produtos);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-2">Preparando a vitrine...</div>;

  const highlights = allProducts.slice(0, 6);
  const electronics = allProducts.filter(p => p.category === 'electronics');
  const jewelery = allProducts.filter(p => p.category === 'jewelery');
  const clothing = allProducts.filter(p => p.category.includes('clothing'));

  const totalPages = Math.ceil(clothing.length / itemsPerPage);
  const currentClothing = clothing.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <section className="hero">
        <h1>Bem-vindo à Loja PUC-Rio</h1>
        <p>A sua plataforma definitiva para eletrônicos de ponta, moda atual e acessórios exclusivos. Explore nossas coleções e aproveite a melhor experiência de compra.</p>
        <button className="btn btn-secondary btn-auto" onClick={() => scrollToSection('novidades')}>
          Ver Novidades
        </button>
      </section>

      <section id="novidades" style={{ marginBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#1e293b' }}>Lançamentos em Destaque</h2>
          <p className="text-gray">Os produtos mais cobiçados do momento, separados especialmente para você.</p>
        </div>
        <div className="carousel">
          {highlights.map((produto) => (
            <div className="product-card" key={produto.id}>
              <img src={produto.image} alt={produto.title} className="product-image" />
              <h3 className="product-title">{produto.title}</h3>
              <p className="product-price">R$ {produto.price.toFixed(2)}</p>
              <button className="btn btn-primary" onClick={() => navigate(`/product/${produto.id}`)}>
                Ver Detalhes
              </button>
            </div>
          ))}
        </div>
      </section>

      {electronics.length > 0 && (
        <div style={{ marginBottom: '5rem' }}>
          <section className="promo-section" style={{ marginBottom: '2rem', background: '#f8fafc', borderLeft: '4px solid #2563eb' }}>
            <div className="promo-text">
              <h2>Conecte-se com o Futuro</h2>
              <p className="mb-1 text-gray" style={{ lineHeight: '1.6' }}>
                Atualize seus gadgets com a nossa seleção de eletrônicos de alta performance. 
                De monitores ultrarrápidos a periféricos essenciais, temos a tecnologia que 
                você precisa para trabalhar e jogar no mais alto nível.
              </p>
              <button className="btn btn-primary btn-auto" onClick={() => scrollToSection('eletronicos')}>
                Explorar Tecnologia
              </button>
            </div>
            <img src={electronics[0].image} alt="Tecnologia" style={{ width: '180px', objectFit: 'contain' }} />
          </section>

          <section id="eletronicos">
            <h2 className="section-title">Departamento de Eletrônicos</h2>
            <div className="products-grid">
              {electronics.map((produto) => (
                <div className="product-card" key={produto.id}>
                  <img src={produto.image} alt={produto.title} className="product-image" />
                  <h3 className="product-title">{produto.title}</h3>
                  <p className="product-price">R$ {produto.price.toFixed(2)}</p>
                  <button className="btn btn-primary" onClick={() => navigate(`/product/${produto.id}`)}>
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {jewelery.length > 0 && (
        <div style={{ marginBottom: '5rem' }}>
          <section className="promo-section" style={{ marginBottom: '2rem', flexDirection: 'row-reverse', background: '#fff', borderRight: '4px solid #fbbf24' }}>
            <div className="promo-text" style={{ textAlign: 'right' }}>
              <h2>Elegância em cada detalhe</h2>
              <p className="mb-1 text-gray" style={{ lineHeight: '1.6' }}>
                Nossa linha de joias foi selecionada pensando em sofisticação. Trabalhamos com 
                metais nobres e peças exclusivas que complementam perfeitamente o seu estilo 
                e brilho pessoal.
              </p>
              <button className="btn btn-primary btn-auto" onClick={() => scrollToSection('joias')}>
                Conhecer Coleção de Joias
              </button>
            </div>
            <img src={jewelery[0].image} alt="Joias" style={{ width: '180px', objectFit: 'contain' }} />
          </section>

          <section id="joias">
            <h2 className="section-title">Coleção de Joias e Acessórios</h2>
            <div className="products-grid">
              {jewelery.map((produto) => (
                <div className="product-card" key={produto.id}>
                  <img src={produto.image} alt={produto.title} className="product-image" />
                  <h3 className="product-title">{produto.title}</h3>
                  <p className="product-price">R$ {produto.price.toFixed(2)}</p>
                  <button className="btn btn-primary" onClick={() => navigate(`/product/${produto.id}`)}>
                    Comprar
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {clothing.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <section className="promo-section" style={{ marginBottom: '2rem', background: '#f8fafc', borderLeft: '4px solid #ec4899' }}>
            <div className="promo-text">
              <h2>Renove o seu Guarda-Roupa</h2>
              <p className="mb-1 text-gray" style={{ lineHeight: '1.6' }}>
                Descubra as últimas tendências da moda com roupas confortáveis e cheias de estilo. 
                Temos opções casuais, elegantes e para o dia a dia, para você se sentir bem 
                em qualquer ocasião.
              </p>
              <button className="btn btn-primary btn-auto" onClick={() => scrollToSection('roupas')}>
                Ver Vestuário
              </button>
            </div>
            <img src={clothing[0].image} alt="Moda" style={{ width: '150px', objectFit: 'contain' }} />
          </section>

          <section id="roupas">
            <h2 className="section-title">
              Moda e Vestuário 
              <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: '#64748b' }}>
                Página {currentPage} de {totalPages}
              </span>
            </h2>
            
            <div className="products-grid">
              {currentClothing.map((produto) => (
                <div className="product-card" key={produto.id}>
                  <img src={produto.image} alt={produto.title} className="product-image" />
                  <h3 className="product-title">{produto.title}</h3>
                  <p className="text-gray" style={{ fontSize: '0.8rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
                    {produto.category === "men's clothing" ? "Masculino" : "Feminino"}
                  </p>
                  <p className="product-price">R$ {produto.price.toFixed(2)}</p>
                  <button className="btn btn-primary" onClick={() => navigate(`/product/${produto.id}`)}>
                    Comprar
                  </button>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="btn btn-secondary btn-auto" 
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(prev => prev - 1);
                    scrollToSection('roupas');
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <ChevronLeft size={16} /> Anterior
                </button>
                
                <span>{currentPage} / {totalPages}</span>
                
                <button 
                  className="btn btn-secondary btn-auto" 
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(prev => prev + 1);
                    scrollToSection('roupas');
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  Próxima <ChevronRight size={16} />
                </button>
              </div>
            )}
          </section>
        </div>
      )}

    </div>
  );
}

export default Home;