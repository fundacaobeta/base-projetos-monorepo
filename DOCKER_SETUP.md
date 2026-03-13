# Guia de Configuração Docker - PlenejaGov Pronto para Produção

Este repositório inclui uma **configuração Docker pronta para produção** com recursos de nível empresarial, incluindo proxy reverso nginx, suporte SSL/TLS, cache Redis, backups automatizados e scripts de gerenciamento abrangentes.

## Início Rápido

### Opção 1: Configuração Automatizada (Recomendado)
```bash
./quick-setup.sh
```
- Instala e inicia o PlenejaGov

Durante o processo, você será solicitado a fornecer:
1. **Domínio**: Digite `localhost` para testes locais. Para produção, digite o domínio do seu servidor.
2. **Build e push de imagens**: Responda `no` (recomendado) para usar imagens pré-construídas do Docker Hub, o que é muito mais rápido. Responda `yes` somente se quiser construir imagens personalizadas.
3. **Nome de usuário do Docker Hub**: Se escolheu construir imagens personalizadas, digite seu nome de usuário do Docker Hub. Isso é usado para marcar e enviar as imagens para seu próprio repositório.

### Opção 2: Configuração Manual
```bash
# 1. Copiar arquivo de ambiente
cp .env.example .env

# 2. Editar .env e definir os valores obrigatórios:
#    - DB_PASSWORD
#    - SESSION_SECRET (gerar com: openssl rand -hex 32)
#    - COOKIE_SECRET (gerar com: openssl rand -hex 32)
#    - JWT_SECRET (gerar com: openssl rand -hex 32)
#    - AWS_SECRET_ACCESS_KEY (senha do MinIO)
#    - REDIS_PASSWORD

# 3. Iniciar serviços (modo Express - inclui PostgreSQL, Redis, MinIO)
docker compose --profile express up -d

# 4. Para produção com SSL
docker compose --profile express --profile ssl up -d
```

## O que há de Novo

### 1. **Docker Compose Pronto para Produção**
- **Proxy reverso Nginx** com terminação SSL/TLS
- **Cache Redis** para gerenciamento de sessão
- **Backups automáticos do banco de dados** com políticas de retenção
- **Verificações de saúde** para todos os serviços
- **Isolamento de rede** (redes separadas de backend/frontend)
- **Endurecimento de segurança** (usuários não-root, no-new-privileges)
- **Implantação baseada em perfis** (modos express/avançado)

### 2. **Dockerfiles Aprimorados**

#### Dockerfile do Backend
- Build multi-estágio para imagens menores
- Usuário não-root (`worklenz`) para segurança
- Sistema init `tini` para tratamento adequado de sinais
- Endpoint de verificação de saúde
- `libvips42` para processamento de imagens
- Diretório de log adequado com permissões

#### Dockerfile do Frontend
- Build multi-estágio com Alpine Linux
- Usuário não-root para segurança
- Injeção de ambiente em tempo de execução (suporta reCAPTCHA, Login Google, etc.)
- Sistema init `tini`
- Endpoint de verificação de saúde
- Configuração `serve` otimizada

### 3. **Configuração Nginx**
- **Suporte SSL/TLS** (Let's Encrypt + autoassinado)
- **Limitação de taxa** (endpoints de API e login)
- **Suporte WebSocket** para Socket.IO
- **Cabeçalhos de segurança** (HSTS, CSP, X-Frame-Options, etc.)
- **Compressão Gzip**
- **Cache de assets estáticos**
- **Balanceamento de carga upstream**

### 4. **Inicialização do Banco de Dados**
- **Restauração de backup** na inicialização
- Sistema de **rastreamento de migração**
- **Tratamento adequado de erros**
- **Marcador de inicialização** para evitar re-execuções

### 5. **Scripts de Gerenciamento**

#### `manage.sh` - Gerenciamento Abrangente
```bash
./manage.sh [comando]

Comandos:
  install          Instalar o PlenejaGov (gera segredos automaticamente)
  start            Iniciar todos os serviços
  stop             Parar todos os serviços
  restart          Reiniciar todos os serviços
  status           Mostrar status dos serviços
  logs             Ver logs dos serviços
  backup           Criar backup do banco de dados
  restore          Restaurar a partir de backup
  upgrade          Atualizar para a versão mais recente
  configure        Configuração interativa
  auto-configure   Configuração automática a partir do DOMAIN no .env
  ssl              Gerenciar certificados SSL
  build            Construir imagens Docker localmente
  push             Enviar imagens para o Docker Hub
  build-push       Construir e enviar em uma etapa
```

#### `quick-setup.sh` - Instalação Automatizada
Configuração em um comando com segredos gerados automaticamente e configuração SSL.

## Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    Nginx (Porta 80/443)                 │
│              SSL/TLS, Limitação de Taxa, Cache          │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐       ┌───────▼────────┐
│   Frontend     │       │    Backend     │
│  (Node:22)     │       │   (Node:20)    │
│  Porta: 5000   │       │   Porta: 3000  │
└────────────────┘       └───────┬────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
            ┌───────▼──┐   ┌────▼────┐  ┌───▼────┐
            │PostgreSQL│   │  Redis  │  │ MinIO  │
            │  Porta:  │   │ Porta:  │  │ Porta: │
            │  5432    │   │  6379   │  │ 9000   │
            └──────────┘   └─────────┘  └────────┘
```

## Configuração

### Modos de Implantação

#### Modo Express (Padrão)
Todos os serviços incluídos - PostgreSQL, Redis, MinIO integrados.
```bash
docker compose --profile express up -d
```

#### Modo Avançado
Use serviços externos (AWS S3, Azure Blob, PostgreSQL externo).
```bash
# Definir em .env:
DEPLOYMENT_MODE=advanced
STORAGE_PROVIDER=s3  # ou azure

docker compose up -d
```

### Variáveis de Ambiente

Variáveis principais no `.env`:
- `DOMAIN` - Seu domínio (localhost para testes locais)
- `DEPLOYMENT_MODE` - express ou advanced
- `STORAGE_PROVIDER` - s3 ou azure
- `ENABLE_SSL` - true/false
- `BACKUP_RETENTION_DAYS` - Dias para manter backups (padrão: 30)

Consulte `.env.example` para documentação completa.

## Recursos de Segurança

1. **Contêineres não-root** - Todos os serviços executam como usuários não-root
2. **Opções de segurança** - `no-new-privileges` habilitado
3. **Isolamento de rede** - Rede do backend é interna
4. **SSL/TLS** - Let's Encrypt para produção, autoassinado para localhost
5. **Limitação de taxa** - Endpoints de API e login protegidos
6. **Cabeçalhos de segurança** - HSTS, CSP, X-Frame-Options, etc.
7. **Gerenciamento de segredos** - Segredos seguros gerados automaticamente

## Backup e Restauração

### Backups Automáticos
Backups do banco de dados são executados automaticamente a cada 24 horas com retenção configurável:
```bash
# Habilitar serviço de backup
docker compose --profile backup up -d
```

### Backup Manual
```bash
./manage.sh backup
```

### Restaurar a partir de Backup
```bash
./manage.sh restore
```

Os backups são armazenados no diretório `./backups/` e comprimidos com gzip.

## Configuração SSL/TLS

### Localhost (Autoassinado)
Configurado automaticamente para testes em localhost.

### Domínio de Produção (Let's Encrypt)
```bash
# 1. Definir domínio em .env
DOMAIN=seu-dominio.com
ENABLE_SSL=true
LETSENCRYPT_EMAIL=seu-email@dominio.com

# 2. Apontar registro DNS A para o IP do seu servidor

# 3. Iniciar com perfil SSL
docker compose --profile express --profile ssl up -d
```

Ou use o script de gerenciamento:
```bash
./manage.sh ssl
```

## Monitoramento

### Ver Status dos Serviços
```bash
./manage.sh status
# ou
docker compose ps
```

### Ver Logs
```bash
./manage.sh logs
# ou
docker compose logs -f [nome-do-servico]
```

### Verificações de Saúde
Todos os serviços incluem verificações de saúde:
- Backend: `http://localhost:3000/public/health`
- Frontend: `http://localhost:5000`
- PostgreSQL: `pg_isready`
- Redis: `redis-cli ping`
- MinIO: `/minio/health/live`

## Atualização

```bash
./manage.sh upgrade
```

Isso irá:
1. Criar um backup
2. Baixar as imagens mais recentes
3. Reconstruir os contêineres
4. Reiniciar os serviços

## Construindo Imagens Personalizadas

### Construir Localmente
```bash
./manage.sh build
```

### Enviar para o Docker Hub
```bash
./manage.sh push
```

### Construir e Enviar
```bash
./manage.sh build-push
```

## Estrutura de Diretórios

```
worklenz/
├── docker-compose.yaml          # Arquivo compose principal
├── .env.example                 # Template de ambiente
├── manage.sh                    # Script de gerenciamento
├── quick-setup.sh              # Script de configuração rápida
├── nginx/                      # Configuração Nginx
│   ├── nginx.conf
│   ├── conf.d/
│   │   └── worklenz.conf
│   └── ssl/                    # Certificados SSL
├── scripts/                    # Scripts de banco de dados
│   └── db-init-wrapper.sh
├── backups/                    # Backups do banco de dados
├── worklenz-backend/
│   └── Dockerfile              # Dockerfile do backend
└── worklenz-frontend/
    └── Dockerfile              # Dockerfile do frontend
```

## Perguntas Frequentes

### E se o Docker não estiver instalado?
Você deve instalar o Docker e o Docker Desktop (para Windows/Mac) ou Docker Engine (para Linux). Siga o [guia oficial de instalação do Docker](https://docs.docker.com/get-docker/).

### Como instalo o Docker Compose?
Instalações modernas do Docker (Docker Desktop e Docker Engine mais recente) incluem o Docker Compose por padrão. Você pode verificar executando `docker compose version`. Se precisar instalá-lo separadamente, consulte o [guia de instalação do Compose](https://docs.docker.com/compose/install/).

### Por que recebo erros de "permissão negada" no Linux?
No Linux, pode ser necessário executar comandos Docker com `sudo` ou adicionar seu usuário ao grupo `docker`:
```bash
sudo usermod -aG docker $USER
```
*Nota: Pode ser necessário fazer logout e login novamente para que essa alteração tenha efeito.*

### Estou no Windows, por que não está funcionando?
Para a melhor experiência no Windows, recomendamos usar o **WSL2** (Windows Subsystem for Linux).
1. Instale o [WSL2](https://learn.microsoft.com/pt-br/windows/wsl/install).
2. Instale o [Docker Desktop para Windows](https://docs.docker.com/desktop/install/windows-install/).
3. Habilite a integração WSL2 nas Configurações do Docker Desktop -> Recursos -> Integração WSL.

### Como verifico se meu hardware suporta virtualização?
- **Windows**: Verifique a aba Desempenho no Gerenciador de Tarefas. Procure por "Virtualização: Habilitada".
- **Linux**: Execute `lscpu | grep Virtualization`.

## Solução de Problemas

### Serviços não iniciam
```bash
# Verificar logs
docker compose logs

# Verificar status dos serviços
docker compose ps

# Reiniciar serviços
./manage.sh restart
```

### Falha na inicialização do banco de dados
```bash
# Verificar logs do banco de dados
docker compose logs postgres

# Verificar se os scripts do banco de dados existem
ls -la worklenz-backend/database/sql/
```

### Problemas com certificado SSL
```bash
# Para Let's Encrypt
./manage.sh ssl

# Verificar informações do certificado
openssl x509 -in nginx/ssl/cert.pem -text -noout
```

### Conflitos de porta
```bash
# Alterar portas em .env
HTTP_PORT=8080
HTTPS_PORT=8443
```

## Migração da Configuração Antiga

Se você está migrando da configuração antiga `docker-compose.yml`:

1. **Faça backup dos seus dados**:
   ```bash
   docker compose exec db pg_dump -U postgres worklenz_db > backup.sql
   ```

2. **Pare os contêineres antigos**:
   ```bash
   docker compose -f docker-compose.yml down
   ```

3. **Copie seus arquivos `.env`** para a nova estrutura

4. **Inicie a nova configuração**:
   ```bash
   docker compose --profile express up -d
   ```

5. **Restaure os dados se necessário**:
   ```bash
   ./manage.sh restore
   ```

## Contribuindo

Ao fazer alterações na configuração Docker:
1. Teste com os modos express e avançado
2. Verifique se as verificações de saúde funcionam
3. Teste a configuração SSL tanto para localhost quanto para produção
4. Atualize esta documentação
