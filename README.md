**Nome do Projeto:** `contratos-api`

**Descrição do Projeto:**

O projeto `contratos-api` é uma API RESTful desenvolvida com Node.js e Express que permite gerenciar contratos de compra entre empresas e clientes. A API oferece endpoints para autenticação de usuários, bem como a criação, leitura, atualização e exclusão de contratos. A autenticação é realizada utilizando JSON Web Tokens (JWT) para garantir que apenas usuários autorizados possam acessar e modificar os contratos.

### Funcionalidades principais:

1. **Autenticação de Usuários (JWT):**
   - O endpoint `/login` permite que um usuário faça login utilizando um nome de usuário e senha (no exemplo, o usuário "gerente" e a senha "senhaDoGerente").
   - Em caso de credenciais válidas, a API gera um token JWT que deve ser enviado nas requisições subsequentes para autenticação.

2. **Gestão de Contratos:**
   - **GET /contratos**: Este endpoint retorna todos os contratos registrados no sistema, mas requer que o usuário esteja autenticado com um token válido.
   - **POST /contratos**: Permite criar um novo contrato de compra, exigindo os dados da empresa, cliente e transporte. Esse endpoint também requer autenticação.
   - **PUT /contratos/:id**: Permite atualizar um contrato existente, identificando-o pelo `id`. O contrato a ser atualizado deve incluir todos os dados necessários (empresa, cliente e transporte).
   - **DELETE /contratos/:id**: Permite excluir um contrato, também identificado pelo `id`. A requisição de exclusão deve incluir um token válido.

### Tecnologias Utilizadas:

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework web para Node.js, utilizado para criar a API.
- **JWT (JSON Web Tokens)**: Utilizado para autenticar as requisições e garantir que apenas usuários autorizados acessem os endpoints protegidos.
- **dotenv**: Para gerenciar variáveis de ambiente de forma segura (como as chaves secretas e configurações do servidor).

### Estrutura do Código:

1. **Login:**
   - O usuário realiza login fornecendo um nome de usuário e senha.
   - Se as credenciais forem válidas, a API gera e retorna um token JWT.

2. **Contratos:**
   - A API gerencia contratos, cada um contendo informações como `empresa`, `cliente` e `transporte`.
   - Os contratos são armazenados em uma variável `contratos`, mas em um sistema real, eles seriam persistidos em um banco de dados.
   
3. **Autenticação e Autorização:**
   - A autenticação é implementada por meio do middleware `authenticateToken`, que verifica o token JWT em todas as rotas protegidas (GET, POST, PUT, DELETE).
   
### Requisitos do Sistema:

- **Node.js:** A versão mínima necessária é a v12.x ou superior.
- **Pacotes de Node.js:** 
  - `express`: Framework para criar a API.
  - `jsonwebtoken`: Biblioteca para gerar e verificar tokens JWT.
  - `dotenv`: Carregar variáveis de ambiente a partir de um arquivo `.env`.
  
### Como Rodar o Projeto:

1. **Instalar as dependências**:
   ```bash
   npm install
   ```

2. **Criar um arquivo `.env`** com as variáveis de ambiente necessárias:
   ```bash
   JWT_SECRET=yourSecretKey
   PORT=3000
   ```

3. **Iniciar o servidor**:
   ```bash
   npm run dev
   ```

4. O servidor será iniciado no endereço: `http://localhost:3000`.

### Exemplos de Requisições:

1. **Login:**
   - **Endpoint:** `POST /login`
   - **Exemplo de corpo da requisição:**
     ```json
     {
       "username": "gerente",
       "password": "senhaDoGerente"
     }
     ```
   - **Resposta:**
     ```json
     {
       "token": "jwtTokenAqui"
     }
     ```

2. **Consultar Contratos:**
   - **Endpoint:** `GET /contratos`
   - **Exemplo de cabeçalho:**
     ```http
     Authorization: Bearer jwtTokenAqui
     ```

3. **Criar Contrato:**
   - **Endpoint:** `POST /contratos`
   - **Exemplo de corpo da requisição:**
     ```json
     {
       "empresa": "Empresa ABC",
       "cliente": "Cliente XYZ",
       "transporte": "Transporte A"
     }
     ```
   - **Resposta:**
     ```json
     {
       "id": 1,
       "empresa": "Empresa ABC",
       "cliente": "Cliente XYZ",
       "transporte": "Transporte A"
     }
     ```

4. **Atualizar Contrato:**
   - **Endpoint:** `PUT /contratos/1`
   - **Exemplo de corpo da requisição:**
     ```json
     {
       "empresa": "Nova Empresa ABC",
       "cliente": "Novo Cliente XYZ",
       "transporte": "Novo Transporte A"
     }
     ```
   - **Resposta:**
     ```json
     {
       "id": 1,
       "empresa": "Nova Empresa ABC",
       "cliente": "Novo Cliente XYZ",
       "transporte": "Novo Transporte A"
     }
     ```

5. **Deletar Contrato:**
   - **Endpoint:** `DELETE /contratos/1`
   - **Resposta:**
     ```json
     {
       "id": 1,
       "empresa": "Nova Empresa ABC",
       "cliente": "Novo Cliente XYZ",
       "transporte": "Novo Transporte A"
     }
     ```

### Considerações:

- **Segurança:** A API usa JWT para autenticação, o que proporciona uma camada básica de segurança. Em um ambiente de produção, considere usar HTTPS e políticas de segurança mais rigorosas.
- **Escalabilidade:** A aplicação atual armazena os contratos em uma variável local (`contratos`), o que não é adequado para produção. Para um sistema em larga escala, seria necessário conectar a um banco de dados (como PostgreSQL ou MongoDB).

Este projeto é um exemplo básico de como construir uma API RESTful com autenticação JWT e CRUD de dados usando Express e TypeScript.