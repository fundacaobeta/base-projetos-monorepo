<div align="center">
<h1 align="center">
    PlenejaGov
</h1>
<h3 align="center">Plataforma open-source de gerenciamento de projetos para equipes eficientes</h3>

<p align="center">
    <a href="https://github.com/Worklenz/worklenz/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg" alt="Licença">
    </a>
    <a href="https://github.com/Worklenz/worklenz/releases">
        <img src="https://img.shields.io/github/v/release/Worklenz/worklenz" alt="Versão">
    </a>
    <a href="https://github.com/Worklenz/worklenz/stargazers">
        <img src="https://img.shields.io/github/stars/Worklenz/worklenz" alt="Estrelas">
    </a>
    <a href="https://github.com/Worklenz/worklenz/network/members">
        <img src="https://img.shields.io/github/forks/Worklenz/worklenz" alt="Forks">
    </a>
    <a href="https://github.com/Worklenz/worklenz/issues">
        <img src="https://img.shields.io/github/issues/Worklenz/worklenz" alt="Issues">
    </a>
</p>

</div>

---

O **PlenejaGov** é uma poderosa plataforma open-source de gerenciamento de projetos, construída para ajudar equipes a planejar de forma mais inteligente, colaborar melhor e entregar mais rápido. Sem ferramentas excessivas. Sem complexidade desnecessária. Tudo o que sua equipe precisa, em um só lugar.

## Primeiros Passos

Escolha a configuração que melhor funciona para você:

### Início Rápido (Docker — Recomendado)

A forma mais rápida de começar — sem configuração complexa, sem infraestrutura complicada.

| Método | Guia |
|--------|-------|
| 🐳 Docker (Recomendado) | [Configuração Rápida com Docker](#inicio-rapido-docker) |
| 🔧 Instalação Manual | [Instalação Manual de Desenvolvimento](#instalacao-manual) |

<br>

## Funcionalidades

- **Gerenciamento de Projetos** - Planeje, execute e monitore projetos do início ao fim com visibilidade total em cada etapa.
- **Gerenciamento de Tarefas** - Divida projetos em tarefas, defina prioridades, prazos e acompanhe o progresso com múltiplas visualizações (lista, quadro, Gantt).
- **Planejamento de Recursos** - Aloque as pessoas certas para as tarefas certas no momento certo — mantenha sua equipe equilibrada e produtiva.
- **Colaboração de Equipe e Clientes** - Reúna sua equipe e clientes em um espaço compartilhado para alinhar objetivos, atualizações e entregas.
- **Insights Financeiros** - Acompanhe orçamentos, custos e desempenho financeiro entre projetos para manter os gastos sob controle e transparentes.
- **Registro de Tempo** - Registre o tempo diretamente nas tarefas para entender onde as horas da sua equipe estão sendo gastas.
- **Análises e Relatórios** - Obtenha insights em tempo real sobre saúde do projeto, carga de trabalho da equipe e desempenho.
- **Gerenciamento de Recursos** - Planeje a capacidade da equipe, evite sobrealocação e agende trabalhos com um agendador visual.
- **Templates de Projetos** - Inicie novos projetos em segundos usando templates pré-construídos para fluxos de trabalho comuns.
- **Colaboração em Equipe** - Comente em tarefas, compartilhe arquivos e mantenha toda a comunicação em contexto — exatamente onde o trabalho acontece.

<br>

## Stack Tecnológica

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

| Camada | Tecnologia |
|-------|-----------|
| **Frontend** | React + Ant Design |
| **Backend** | TypeScript + Express.js |
| **Banco de Dados** | PostgreSQL |
| **Armazenamento** | MinIO (compatível com S3) / AWS S3 / Azure Blob |
| **Cache** | Redis |
| **Proxy** | Nginx |

### Requisitos

- Node.js versão v18 ou mais recente
- PostgreSQL versão v15 ou mais recente
- Docker e Docker Compose (para configuração containerizada)


## Documentação

Explore a [documentação do produto](https://docs.worklenz.com/en/start/introduction/) para aprender sobre funcionalidades, configuração e uso.

<br>

<a id="inicio-rapido-docker"></a>
### Início Rápido (Docker — Recomendado)

A forma mais rápida de executar o PlenejaGov localmente com todas as dependências incluídas. Esta configuração inclui recursos **prontos para produção** como proxy reverso nginx, suporte SSL/TLS, cache Redis e backups automatizados.

**Pré-requisitos:**
- Docker e Docker Compose instalados no seu sistema
- Git

**Passos:**

#### Opção 1: Configuração Automatizada (Mais Fácil)
```bash
# Clonar o repositório
git clone https://github.com/Worklenz/worklenz.git
cd worklenz

# Executar o script de configuração automatizado
./quick-setup.sh
```

Este script irá:
- ✅ Criar o arquivo `.env` com segredos de segurança gerados automaticamente
- ✅ Configurar URLs baseadas no seu domínio (localhost ou produção)
- ✅ Configurar certificados SSL (autoassinado para localhost, Let's Encrypt para produção)
- ✅ Instalar e iniciar todos os serviços

#### Opção 2: Configuração Manual
```bash
# Clonar o repositório
git clone https://github.com/Worklenz/worklenz.git
cd worklenz

# Copiar e configurar o arquivo de ambiente
cp .env.example .env
# Editar .env e definir os valores necessários (DB_PASSWORD, SESSION_SECRET, etc.)

# Iniciar serviços (modo Express - inclui PostgreSQL, Redis, MinIO)
docker compose --profile express up -d
```

**Acessar a aplicação:**
- **Aplicação**: https://localhost (ou http://localhost)
- **Console MinIO**: http://localhost:9001 (login: minioadmin/minioadmin)

**Gerenciamento:**
```bash
# Use o script de gerenciamento para operações comuns
./manage.sh status    # Ver status dos serviços
./manage.sh logs      # Ver logs
./manage.sh backup    # Criar backup do banco de dados
./manage.sh stop      # Parar todos os serviços
./manage.sh start     # Iniciar todos os serviços
```

**Para documentação detalhada**, consulte o [DOCKER_SETUP.md](DOCKER_SETUP.md)

<a id="instalacao-manual"></a>
### Instalação Manual (Para Desenvolvimento)

Para desenvolvedores que desejam executar os serviços individualmente ou personalizar a configuração.

**Pré-requisitos:**
- Node.js (versão 18 ou superior)
- PostgreSQL (versão 15 ou superior)
- Um serviço de armazenamento compatível com S3 (como MinIO) ou Azure Blob Storage

**Passos:**

1. Clonar o repositório:
```bash
git clone https://github.com/Worklenz/worklenz.git
cd worklenz
```

2. Configurar variáveis de ambiente:
```bash
cp worklenz-backend/.env.template worklenz-backend/.env
# Atualize as variáveis de ambiente com sua configuração
```

3. Instalar dependências:
```bash
# Dependências do backend
cd worklenz-backend
npm install

# Dependências do frontend
cd ../worklenz-frontend
npm install
```

4. Configurar o banco de dados:
```bash
# Criar um banco de dados PostgreSQL chamado worklenz_db
cd worklenz-backend

# Executar os arquivos SQL de configuração na ordem correta
psql -U seu_usuario -d worklenz_db -f database/sql/0_extensions.sql
psql -U seu_usuario -d worklenz_db -f database/sql/1_tables.sql
psql -U seu_usuario -d worklenz_db -f database/sql/indexes.sql
psql -U seu_usuario -d worklenz_db -f database/sql/4_functions.sql
psql -U seu_usuario -d worklenz_db -f database/sql/triggers.sql
psql -U seu_usuario -d worklenz_db -f database/sql/3_views.sql
psql -U seu_usuario -d worklenz_db -f database/sql/2_dml.sql
psql -U seu_usuario -d worklenz_db -f database/sql/5_database_user.sql
```

5. Iniciar os servidores de desenvolvimento:
```bash
# Backend (comando único para build, watch e reinício automático)
cd worklenz-backend
npm run dev:all

# Frontend (em outro terminal)
cd worklenz-frontend
npm run dev
```

6. Acesse a aplicação em http://localhost:5000

## Implantação

### Desenvolvimento Local

Para desenvolvimento local, siga a seção [Início Rápido (Docker)](#inicio-rapido-docker) acima.

### Implantação em Produção

A nova configuração Docker inclui recursos prontos para produção para implantações seguras e escaláveis.

#### Configuração Rápida para Produção

```bash
# Clonar e navegar até o repositório
git clone https://github.com/Worklenz/worklenz.git
cd worklenz

# Executar a configuração automatizada
./quick-setup.sh
# Quando solicitado, insira seu domínio de produção (ex: planejagov.exemplo.com.br)
# O script configurará SSL com Let's Encrypt automaticamente
```

#### Configuração Manual para Produção

1. **Configure o ambiente para seu domínio:**
   ```bash
   cp .env.example .env
   # Editar .env e definir:
   # - DOMAIN=seu-dominio.com
   # - VITE_API_URL=https://seu-dominio.com
   # - VITE_SOCKET_URL=wss://seu-dominio.com
   # - ENABLE_SSL=true
   # - LETSENCRYPT_EMAIL=seu-email@dominio.com
   # - Gere segredos seguros para DB_PASSWORD, SESSION_SECRET, etc.
   ```

2. **Aponte o registro DNS A do seu domínio para o IP do seu servidor**

3. **Inicie os serviços com SSL:**
   ```bash
   docker compose --profile express --profile ssl up -d
   ```

4. **Acesse sua aplicação em:** https://seu-dominio.com

#### Comandos de Gerenciamento

```bash
./manage.sh install    # Instalação interativa
./manage.sh upgrade    # Atualizar para a versão mais recente
./manage.sh backup     # Criar backup do banco de dados
./manage.sh restore    # Restaurar a partir de backup
./manage.sh ssl        # Gerenciar certificados SSL
./manage.sh status     # Ver status dos serviços
```

#### Modos de Implantação

- **Modo Express** (padrão): Todos os serviços incluídos (PostgreSQL, Redis, MinIO)
  ```bash
  docker compose --profile express up -d
  ```

- **Modo Avançado**: Use serviços externos (AWS S3, Azure Blob, PostgreSQL externo)
  ```bash
  # Defina DEPLOYMENT_MODE=advanced em .env
  docker compose up -d
  ```

**Para documentação completa de implantação**, consulte o [DOCKER_SETUP.md](DOCKER_SETUP.md)

## Configuração

### Variáveis de Ambiente

O PlenejaGov usa um sistema abrangente de configuração de ambiente. Copie `.env.example` para `.env` e configure de acordo com suas necessidades.

**Áreas Principais de Configuração:**

- **Modo de Implantação**: `express` (todos os serviços incluídos) ou `advanced` (serviços externos)
- **Domínio e URLs**: Configure para localhost ou domínio de produção
- **Banco de Dados**: Credenciais e configurações de conexão PostgreSQL
- **Segredos de Segurança**: Segredos de sessão, cookie e JWT (gerados automaticamente pelos scripts de configuração)
- **Armazenamento**: MinIO (padrão), AWS S3 ou Azure Blob Storage
- **Redis**: Configuração de cache (modo Express)
- **SSL/TLS**: Let's Encrypt para produção, autoassinado para localhost
- **Backups**: Configurações de retenção de backup automatizado
- **Funcionalidades Opcionais**: Google OAuth, reCAPTCHA, notificações por e-mail

**Configuração Rápida:**

```bash
# Gerar automaticamente todos os segredos e configurar baseado no domínio
./manage.sh auto-configure

# Ou gerar segredos manualmente
openssl rand -hex 32  # Use para SESSION_SECRET, COOKIE_SECRET, JWT_SECRET
```

**Variáveis Importantes:**

- `DOMAIN`: Seu domínio (localhost para testes locais)
- `DEPLOYMENT_MODE`: express ou advanced
- `STORAGE_PROVIDER`: s3 (MinIO/AWS) ou azure
- `ENABLE_SSL`: true/false para SSL/TLS
- `BACKUP_RETENTION_DAYS`: Dias para manter backups (padrão: 30)

Para uma lista completa de variáveis com documentação detalhada, consulte `.env.example`.

## Integração MinIO

O projeto usa MinIO como serviço de armazenamento de objetos compatível com S3, que fornece uma alternativa open-source ao AWS S3 para desenvolvimento e produção.

### Trabalhando com MinIO

O MinIO fornece uma API compatível com S3, portanto qualquer código que funciona com S3 funcionará com MinIO simplesmente alterando a URL do endpoint. O backend foi configurado para usar MinIO por padrão, sem nenhuma configuração adicional necessária.

- **Console MinIO**: http://localhost:9001
  - Usuário: minioadmin
  - Senha: minioadmin

- **Bucket Padrão**: worklenz-bucket (criado automaticamente quando os contêineres iniciam)

### Configuração de Armazenamento do Backend

O backend está pré-configurado para usar MinIO com as seguintes configurações:

```javascript
// Credenciais S3 com padrões MinIO
export const REGION = process.env.AWS_REGION || "us-east-1";
export const BUCKET = process.env.AWS_BUCKET || "worklenz-bucket";
export const S3_URL = process.env.S3_URL || "http://minio:9000/worklenz-bucket";
export const S3_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "minioadmin";
export const S3_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "minioadmin";
```

## Segurança

O PlenejaGov é construído com segurança em mente:

- Contêineres Docker não-root
- Isolamento de rede (backend é interno)
- SSL/TLS (Let's Encrypt para produção, autoassinado para localhost)
- Limitação de taxa em endpoints de API e login
- Cabeçalhos de segurança (HSTS, CSP, X-Frame-Options, etc.)
- Segredos seguros gerados automaticamente via `openssl rand -hex 32`

Encontrou uma vulnerabilidade de segurança? Por favor, **não** abra uma issue pública. Entre em contato diretamente com a equipe responsável.

<br>

## Contribuindo

Adoramos contribuições da comunidade! Veja como você pode ajudar:

- Reporte bugs abrindo uma issue
- Solicite funcionalidades abrindo uma issue
- Melhore a documentação
- Compartilhe o PlenejaGov com sua equipe ou escreva sobre ele

Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) antes de enviar um pull request.

<br>

## Licença

O PlenejaGov é open source, lançado sob a [Licença Pública Geral GNU Affero v3.0](LICENSE).

Ao contribuir com o PlenejaGov, você concorda que suas contribuições serão licenciadas sob a AGPL v3.0.

<br>

---

<br>
<div align="center">
  <strong>Construído com dedicação para a gestão pública brasileira.</strong>
</div>
