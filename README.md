# Vou Ali Backend Nest

API REST desenvolvida com NestJS para apoiar o planejamento e a organização de viagens. O sistema centraliza autenticação, cadastro de usuários e o gerenciamento de viagens, cidades, paradas, atividades e despesas em uma única camada de backend.

## Sobre

O **Vou Ali Backend Nest** é a base de API do projeto acadêmico *Vou Ali*. Ele resolve o problema de organizar informações dispersas sobre uma viagem, oferecendo uma estrutura padronizada para:

- autenticação de usuários com JWT;
- cadastro e manutenção de perfis;
- criação e acompanhamento de viagens;
- controle de cidades, paradas, atividades e despesas associadas;
- documentação interativa da API via Swagger.

O projeto foi construído para servir como uma API moderna, modular e fácil de evoluir, com separação clara entre controllers, services, entities e módulos de domínio.

## Funcionalidades

- Autenticação com JWT e estratégias local e jwt via Passport.
- Cadastro, consulta e atualização de usuários.
- CRUD de viagens.
- CRUD de cidades.
- CRUD de paradas.
- CRUD de atividades.
- CRUD de despesas.
- Hash de senhas com bcrypt.
- Persistência com TypeORM.
- Validação de dados com class-validator e class-transformer.
- Documentação da API com Swagger em /swagger.

## Tecnologias Principais

| Categoria | Tecnologias |
|---|---|
| Linguagem | TypeScript |
| Framework | NestJS |
| Runtime | Node.js |
| Banco de dados | TypeORM com suporte a MySQL, PostgreSQL e SQLite |
| Autenticação | JWT, Passport, Bcrypt |
| Validação | class-validator, class-transformer |
| Documentação | Swagger / OpenAPI |
| Configuração | @nestjs/config |

## Pré-requisitos

Antes de executar o projeto, verifique se você possui:

- Node.js 18 ou superior;
- npm instalado junto com o Node.js;
- um banco de dados compatível com a configuração escolhida, normalmente MySQL em desenvolvimento;
- acesso ao arquivo .env, baseado em .env.example;
- opcionalmente, Swagger UI para testar endpoints de forma interativa.

## Diagramas do projeto

- Diagrama de Caso de Uso
<img width="1400" height="1099" alt="Diagrama de Caso de Uso - vou Ali(1)" src="https://github.com/user-attachments/assets/8a9ff7d0-7c80-43ae-b18c-42a14f752eaa" />



- Diagrama de Classes
<img width="2280" height="1420" alt="Diagrama de classes(1)" src="https://github.com/user-attachments/assets/a6a986fc-2f60-48f3-8ffe-4ea7bc4f0602" />


## Instalação e Execução

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd vou-ali-backend-nest
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto com base no arquivo .env.example.

As variáveis esperadas são, em geral:

| Variável | Finalidade |
|---|---|
| DB_TYPE | Tipo do banco de dados |
| DB_HOST | Endereço do servidor de banco |
| DB_PORT | Porta do banco |
| DB_USERNAME | Usuário do banco |
| DB_PASSWORD | Senha do banco |
| DB_DATABASE | Nome do banco |
| PORT | Porta da API |
| JWT_SECRET | Chave secreta para assinatura do token |

Exemplo base:

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=senha
DB_DATABASE=vou_ali
PORT=3000
JWT_SECRET=sua_chave_secreta
```

### 4. Prepare o banco de dados

Certifique-se de que o banco configurado em .env esteja acessível antes de subir a aplicação. Se houver migrations ou seeders no seu fluxo local, execute-os conforme a estratégia adotada no ambiente de desenvolvimento.

### 5. Execute a aplicação

Para desenvolvimento com recarregamento automático:

```bash
npm run start:dev
```

Ou, se preferir carregar o arquivo .env diretamente durante o watch:

```bash
npm run start:env
```

Para produção:

```bash
npm run build
npm run start:prod
```

### 6. Acesse a documentação

Depois de iniciar a API, abra o Swagger no navegador:

```text
http://localhost:3000/swagger
```

## Exemplos de Uso

### Fluxo básico de utilização

1. Cadastre um usuário em `POST /usuarios/cadastrar`.
2. Autentique-se em `POST /usuarios/logar` para obter o token JWT.
3. Envie o token no header `Authorization: Bearer <TOKEN>` para consumir rotas protegidas.
4. Crie e gerencie viagens em `/viagens`.
5. Associe cidades, paradas, atividades e despesas conforme a necessidade do roteiro.

### Rotas principais

| Recurso | Rota base | Observação |
|---|---|---|
| Autenticação | `/usuarios/logar` | Gera token JWT |
| Usuários | `/usuarios` | Cadastro, listagem e atualização |
| Viagens | `/viagens` | Rotas protegidas por JWT |
| Cidades | `/cidades` | Rotas protegidas por JWT |
| Paradas | `/paradas` | Rotas protegidas por JWT |
| Atividades | `/atividades` | Rotas públicas no projeto atual |
| Despesas | `/despesas` | Rotas protegidas por JWT |

### Exemplo de autenticação

```http
POST /usuarios/logar
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "senha": "sua_senha"
}
```

Após o login, utilize o token retornado para chamadas autenticadas:

```http
GET /viagens
Authorization: Bearer <TOKEN_JWT>
```

### Uso via Swagger

O Swagger é a forma recomendada de explorar os contratos da API, validar payloads e testar rapidamente os endpoints sem precisar montar requisições manualmente.

## Scripts Disponíveis

| Script | Descrição |
|---|---|
| npm run start | Inicia a aplicação em modo padrão |
| npm run start:dev | Inicia com watch para desenvolvimento |
| npm run start:env | Inicia com watch carregando o arquivo .env |
| npm run start:debug | Inicia com depuração habilitada |
| npm run start:prod | Executa a versão compilada em dist/ |
| npm run build | Compila o projeto |
| npm run lint | Executa o lint e corrige problemas simples |
| npm run format | Formata o código |
| npm run test | Executa os testes unitários |
| npm run test:e2e | Executa os testes end-to-end |

## Contribuindo

Contribuições são bem-vindas, desde que sigam uma linha consistente com a estrutura atual do projeto.

- Crie uma branch específica para sua alteração.
- Mantenha a arquitetura modular já adotada em src/.
- Preserve padrões de nomenclatura, DTOs, services e entities.
- Execute npm run lint e os testes relevantes antes de abrir um pull request.
- Descreva claramente o objetivo da alteração e o impacto esperado.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo package.json e os termos da licença do repositório para detalhes adicionais.
