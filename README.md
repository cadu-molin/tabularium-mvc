# tabularium-mvc
Trabalho de Arquitetura De Software utilizando o padrão arquitetural MVC

Aplicação web para catalogação e resenha de livros.

## Stack

- **Backend:** AdonisJS 6 em TypeScript (Node.js)
- **Frontend embutido:** React (via Inertia.js)
- **ORM:** Lucid (AdonisJS)
- **Autenticação:** Sessão (Session-based)
- **Banco de Dados:** PostgreSQL

### Pré-requisitos

- [Node.js](https://nodejs.org/) (Versão >= 20)
- [npm](https://www.npmjs.com/) (LTS)
- [PostgreSQL](https://www.postgresql.org/) (Versão >= 17)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/josehcagnini/tabularium-mvc
   cd tabularium-mvc
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```	
3. **Configure as variáveis de ambiente:**
   Copie `.env.example` para `.env` e ajuste conforme seu ambiente.
   ```bash
   cp .env.example .env
   ```
4. **Execute as migrações do banco de dados:** 
   ```bash
   node ace migration:run
   ```
5. **Inicie o servidor de desenvolvimento:** 
   ```bash
   npm run dev
   ```