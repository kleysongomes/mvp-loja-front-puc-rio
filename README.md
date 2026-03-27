# MVP Loja Front-End - PUC-Rio

## 📝 Descrição do Projeto

Esta é uma Single Page Application (SPA) desenvolvida em React.js para o Produto Mínimo Viável (MVP) da disciplina de Arquitetura de Software da PUC-Rio.

A interface se comunica exclusivamente com a API Principal (Back-End) para realizar operações de CRUD de usuários, autenticação, gerenciamento de pagamentos, compras e renderização da vitrine de produtos.

## ✨ Funcionalidades

-   Visualização da vitrine de produtos.
-   Cadastro e autenticação de usuários (JWT).
-   Gerenciamento de perfil do usuário (visualização e atualização de dados).
-   Gerenciamento de formas de pagamento (cartões).
-   Histórico de compras.
-   Finalização de compras.
-   Exclusão de conta.

## 🛠️ Tecnologias Utilizadas

*   **Biblioteca Principal:** React 18
*   **Build Tool:** Vite
*   **Roteamento:** React Router Dom
*   **Requisições HTTP:** Axios
*   **Ícones:** Lucide React
*   **Estilização:** CSS3 (Custom Design System)
*   **Conteinerização:** Docker + Nginx

## 🔌 Endpoints da API Consumidos

A interface consome os seguintes métodos HTTP para interagir com o back-end:

*   **`GET`**: Busca de produtos, perfil do usuário, lista de cartões e histórico de pedidos.
*   **`POST`**: Cadastro de usuário, login (autenticação JWT), adição de cartões e finalização de compras.
*   **`PUT`**: Atualização de dados cadastrais do perfil (nome, e-mail e endereço).
*   **`DELETE`**: Exclusão de formas de pagamento e encerramento definitivo da conta do usuário.

## 🚀 Como Executar

### 📋 Pré-requisitos

*   Node.js (v18 ou superior)
*   Docker

> **⚠️ Atenção:** Para que a aplicação funcione, o Back-End (API Principal) **deve** estar em execução e acessível na porta `8000`.

### ⚙️ Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/kleysongomes/mvp-loja-front-puc-rio.git
    cd mvp-loja-front-puc-rio
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

### 📦 Opção 1: Execução Local (Desenvolvimento)

1.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

2.  Acesse a aplicação em `http://localhost:5173` no seu navegador.

### 🐳 Opção 2: Execução com Docker (Produção)

1.  Construa a imagem Docker:
    ```bash
    docker build -t mvp-frontend-loja .
    ```

2.  Execute o contêiner:
    ```bash
    docker run -d -p 80:80 --name meu-frontend mvp-frontend-loja
    ```

3.  Acesse a aplicação em `http://localhost` no seu navegador.
