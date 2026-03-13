# Backend PlenejaGov

Este é o backend Express.js/TypeScript para a plataforma de gerenciamento de projetos PlenejaGov.

## Pré-requisitos

- Node.js >= 20.0.0
- npm >= 8.11.0
- PostgreSQL >= 12

## Primeiros Passos

### 1. Configuração do Ambiente

Crie um arquivo `.env` a partir do template:

```bash
cp .env.template .env
```

Atualize o arquivo `.env` com sua configuração específica. As variáveis principais incluem:

- **Banco de Dados**: `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_HOST`, `DB_PORT`
- **Servidor**: `PORT`, `NODE_ENV`, `SESSION_SECRET`, `COOKIE_SECRET`
- **Frontend**: `FRONTEND_URL`, `SERVER_CORS`
- **Armazenamento**: Configure S3 ou Azure Blob Storage
- **Autenticação**: Credenciais Google OAuth se necessário

### 2. Configuração do Banco de Dados

Crie e inicialize o banco de dados:

```bash
# Criar banco de dados
createdb plenejagov_db

# Executar arquivos SQL de configuração em ordem
psql -U postgres -d plenejagov_db -f database/sql/0_extensions.sql
psql -U postgres -d plenejagov_db -f database/sql/1_tables.sql
psql -U postgres -d plenejagov_db -f database/sql/indexes.sql
psql -U postgres -d plenejagov_db -f database/sql/4_functions.sql
psql -U postgres -d plenejagov_db -f database/sql/triggers.sql
psql -U postgres -d plenejagov_db -f database/sql/3_views.sql
psql -U postgres -d plenejagov_db -f database/sql/2_dml.sql
psql -U postgres -d plenejagov_db -f database/sql/5_database_user.sql
```

Ou use o script fornecido:

```bash
chmod +x database/00-init-db.sh
./database/00-init-db.sh
```

### 3. Instalar Dependências

```bash
npm install
```

## Desenvolvimento

### Início Rápido

Execute tanto o build em modo watch quanto o servidor com reinício automático:

```bash
npm run dev:all
```

Este comando único substitui a necessidade de executar `npm run dev` e `npm start` separadamente. Ele:
- Compila o código TypeScript em modo de desenvolvimento
- Monitora alterações de arquivos e recompila automaticamente
- Executa o servidor com nodemon para reinício automático nas alterações

### Comandos Alternativos de Desenvolvimento

```bash
# Build e monitoramento de arquivos apenas (sem servidor)
npm run dev

# Build único para desenvolvimento
npm run build:dev

# Iniciar apenas o servidor (após o build)
npm start
```

## Scripts NPM

| Script | Descrição |
|--------|-----------|
| `npm start` | Iniciar o servidor |
| `npm run dev` | Build e monitoramento de arquivos para desenvolvimento |
| `npm run dev:all` | Build, watch e reinício automático do servidor para desenvolvimento (recomendado) |
| `npm run build` | Build padrão |
| `npm run build:dev` | Build de desenvolvimento |
| `npm run build:prod` | Build de produção com minificação e compressão |
| `npm test` | Executar testes Jest |
| `npm run test:watch` | Executar testes em modo watch |
| `npm run clean` | Limpar diretório de build |
| `npm run compile` | Compilar TypeScript |
| `npm run compile:dev` | Compilar TypeScript para desenvolvimento |
| `npm run watch` | Monitorar arquivos TypeScript e assets |
| `npm run watch:ts` | Monitorar apenas arquivos TypeScript |
| `npm run watch:assets` | Monitorar apenas arquivos de assets |

## Documentação da API

A API segue os princípios de design RESTful com endpoints prefixados com `/api/`.

### Autenticação

A API usa tokens JWT para autenticação. Rotas protegidas requerem um token válido no cabeçalho Authorization.

### Armazenamento de Arquivos

A aplicação suporta armazenamento compatível com S3 e Azure Blob Storage para uploads de arquivos. Configure sua opção de armazenamento preferida no arquivo `.env`.

## Diretrizes de Desenvolvimento

- O código deve ser escrito em TypeScript
- Siga os padrões estabelecidos para controllers, services e middlewares
- Adicione tratamento adequado de erros para todos os endpoints da API
- Escreva testes unitários para funcionalidades críticas
- Documente endpoints de API com descrições e exemplos claros

## Executando Testes

```bash
npm test
```

## Suporte Docker

O backend pode ser executado em um contêiner Docker. Consulte o README principal do projeto para instruções de configuração Docker.
