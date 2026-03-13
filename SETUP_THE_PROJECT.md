# Configurando o Ambiente de Desenvolvimento

Começar com o desenvolvimento é fácil! Siga estes passos e você estará contribuindo em pouco tempo.

## Requisitos

- Node.js versão v20 ou mais recente - [Node.js](https://nodejs.org/en/download/)
- PostgreSQL versão v15 ou mais recente - [PostgreSQL](https://www.postgresql.org/download/)
- Armazenamento compatível com S3 (como MinIO) para armazenamento de arquivos

## Pré-requisitos

- `$ npm install -g typescript` (opcional, mas recomendado)

## Instalação

**Clone o repositório:**

   ```bash
   git clone https://github.com/Worklenz/worklenz.git
   cd worklenz
   ```

### Instalação do Frontend

1. **Navegue até o diretório do projeto frontend:**

   ```bash
   cd worklenz-frontend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute o frontend:**
   ```bash
   npm start
   ```

4. Acesse [http://localhost:5173](http://localhost:5173) (servidor de desenvolvimento)

### Instalação do Backend

1. **Navegue até o diretório do projeto backend:**

   ```bash
   cd worklenz-backend
   ```

2. **Abra sua IDE:**

   Abra o diretório do projeto no seu editor de código ou IDE preferido, como o Visual Studio Code.

3. **Configure as Variáveis de Ambiente:**

   - Crie uma cópia do arquivo `.env.example` e nomeie-o `.env`.
   - Atualize os campos obrigatórios em `.env` com sua configuração específica.

4. **Configure o Banco de Dados**
   - Crie um novo banco de dados chamado `worklenz_db` em seu servidor PostgreSQL local.
   - Atualize os detalhes de conexão do banco de dados em seu arquivo `.env`.
   - Execute os arquivos SQL de configuração na ordem correta:

   ```bash
   # Do seu cliente PostgreSQL ou linha de comando
   psql -U seu_usuario -d worklenz_db -f database/sql/0_extensions.sql
   psql -U seu_usuario -d worklenz_db -f database/sql/1_tables.sql
   psql -U seu_usuario -d worklenz_db -f database/sql/indexes.sql
   psql -U seu_usuario -d worklenz_db -f database/sql/4_functions.sql
   psql -U seu_usuario -d worklenz_db -f database/sql/triggers.sql
   psql -U seu_usuario -d worklenz_db -f database/sql/3_views.sql
   psql -U seu_usuario -d worklenz_db -f database/sql/2_dml.sql
   psql -U seu_usuario -d worklenz_db -f database/sql/5_database_user.sql
   ```

   Alternativamente, você pode usar o script shell fornecido:

   ```bash
   # Certifique-se de que o script é executável
   chmod +x database/00-init-db.sh
   # Execute o script (pode precisar de modificações para execução local)
   ./database/00-init-db.sh
   ```

5. **Instale as Dependências:**

   ```bash
   npm install
   ```

6. **Execute o Servidor de Desenvolvimento:**

   **Opção 1: Modo de desenvolvimento combinado (Recomendado)**

   ```bash
   npm run dev:all
   ```

   Este comando único executa tanto o processo de build em modo watch quanto o servidor com reinício automático. Não é necessário executar `npm run dev` e `npm start` separadamente.

   **Opção 2: Comandos separados**

   ```bash
   # Terminal 1: Build e monitoramento de alterações
   npm run dev

   # Terminal 2: Iniciar o servidor
   npm start
   ```

   A primeira opção (`npm run dev:all`) é recomendada por simplificar o fluxo de desenvolvimento.

## Configuração Docker (Alternativa - Recomendada para Início Rápido)

Para uma configuração mais fácil com recursos prontos para produção, use a nova configuração Docker com scripts automatizados:

### Início Rápido com Docker

**Opção 1: Configuração Automatizada (Mais Fácil)**

```bash
# A partir do diretório raiz, execute a configuração automatizada
./quick-setup.sh
```

Este script irá:
- Criar o arquivo `.env` com segredos de segurança gerados automaticamente
- Configurar URLs para localhost
- Configurar certificados SSL (autoassinado para localhost)
- Instalar e iniciar todos os serviços (PostgreSQL, Redis, MinIO, nginx)

**Opção 2: Configuração Manual Docker**

```bash
# Copiar configuração de ambiente
cp .env.example .env
# Editar .env se necessário (os padrões funcionam para localhost)

# Iniciar serviços (modo Express - todos os serviços incluídos)
docker compose --profile express up -d
```

### Acessar a Aplicação

- **Aplicação**: https://localhost (ou http://localhost)
- **Console MinIO**: http://localhost:9001 (login: minioadmin/minioadmin)

### Comandos de Gerenciamento

```bash
./manage.sh status    # Ver status dos serviços
./manage.sh logs      # Ver logs
./manage.sh stop      # Parar todos os serviços
./manage.sh start     # Iniciar todos os serviços
./manage.sh backup    # Criar backup do banco de dados
./manage.sh restart   # Reiniciar todos os serviços
```

### O que está Incluído

A configuração Docker agora inclui:
- ✅ Proxy reverso Nginx com suporte SSL/TLS
- ✅ Cache Redis para melhor performance
- ✅ Backups automáticos do banco de dados
- ✅ Verificações de saúde em todos os serviços
- ✅ Isolamento de rede e endurecimento de segurança
- ✅ Configuração pronta para produção

### Para Documentação Completa

Consulte o [DOCKER_SETUP.md](DOCKER_SETUP.md) para:
- Guia de implantação em produção
- Configuração SSL/TLS
- Procedimentos de backup e restauração
- Opções de configuração avançadas
- Guia de solução de problemas
