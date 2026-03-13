# Configuração do Node-pg-migrate para PlenejaGov

## Instalação

```bash
npm install --save node-pg-migrate
npm install --save-dev @types/node-pg-migrate
```

## Configuração

### 1. Adicionar ao package.json scripts:

```json
{
  "scripts": {
    "migrate": "node-pg-migrate",
    "migrate:up": "node-pg-migrate up",
    "migrate:down": "node-pg-migrate down",
    "migrate:create": "node-pg-migrate create",
    "migrate:redo": "node-pg-migrate redo"
  }
}
```

### 2. Criar configuração de migração (.pgmrc ou migrations/config.js):

```javascript
// migrations/config.js
module.exports = {
  databaseUrl: process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  direction: 'up',
  count: undefined,
  schema: 'public',
  createSchema: false,
  checkOrder: true,
  migrationFilenameFormat: 'utc',
  templateFileName: 'migration-template.ts'
};
```

## Estrutura de Migração

### Plano de Migração Inicial (Converter arquivos SQL existentes):

1. **001_extensions.ts** - Habilitar extensões necessárias
2. **002_domains_and_types.ts** - Criar domínios e tipos enum customizados
3. **003_core_tables.ts** - Tabelas de usuário, organização e autenticação
4. **004_project_tables.ts** - Tabelas de gerenciamento de projetos
5. **005_task_tables.ts** - Tabelas de gerenciamento de tarefas
6. **006_indexes.ts** - Criar todos os índices
7. **007_functions.ts** - Procedimentos armazenados e funções
8. **008_triggers.ts** - Triggers do banco de dados
9. **009_views.ts** - Views do banco de dados
10. **010_initial_data.ts** - Dados iniciais

### Exemplo de Arquivo de Migração:

```typescript
// migrations/001_extensions.ts
import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createExtension('uuid-ossp', { ifNotExists: true });
  pgm.createExtension('pg_trgm', { ifNotExists: true });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropExtension('pg_trgm', { ifExists: true });
  pgm.dropExtension('uuid-ossp', { ifExists: true });
}
```

### Exemplo de Migração Complexa (Tabelas com relações):

```typescript
// migrations/003_core_tables.ts
import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  // Criar domínio customizado
  pgm.createDomain('wl_email', 'text', {
    check: "value ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'"
  });

  // Criar tipo enum
  pgm.createType('language_type', ['en', 'es', 'pt', 'alb', 'de', 'zh_cn', 'ko']);

  // Criar tabela de usuários
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
      notNull: true
    },
    email: {
      type: 'wl_email',
      notNull: true,
      unique: true
    },
    name: {
      type: 'varchar(255)',
      notNull: true
    },
    password: {
      type: 'text'
    },
    language: {
      type: 'language_type',
      default: 'en'
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });

  // Criar índices
  pgm.createIndex('users', 'email');
  pgm.createIndex('users', 'created_at');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('users');
  pgm.dropType('language_type');
  pgm.dropDomain('wl_email');
}
```

## Benefícios para o PlenejaGov

1. **Atualizações Incrementais**: Novas funcionalidades podem ser adicionadas como novas migrações
2. **Colaboração em Equipe**: Desenvolvedores podem ver exatamente quais mudanças de BD foram feitas
3. **Integração CI/CD**: Migrações podem ser executadas automaticamente nos pipelines de implantação
4. **Segurança no Desenvolvimento**: Capacidades de rollback para ambientes de desenvolvimento
5. **Histórico de Migrações**: Trilha de auditoria clara de todas as mudanças do banco de dados

## Comandos de Migração

```bash
# Criar uma nova migração
npm run migrate:create minha_nova_funcionalidade

# Executar todas as migrações pendentes
npm run migrate:up

# Reverter a última migração
npm run migrate:down

# Reverter e re-executar a última migração
npm run migrate:redo

# Executar migrações até uma versão específica
npm run migrate:up 3

# Verificar status das migrações
npm run migrate -- status
```

## Estratégia de Transição

### Fase 1: Configuração (Semana 1)
1. Instalar node-pg-migrate
2. Criar configuração de migração
3. Testar conexão e configuração

### Fase 2: Converter Schema Existente (Semanas 2-3)
1. Criar migração base do schema atual
2. Dividir arquivos SQL grandes em migrações lógicas
3. Testar migrações em banco de dados limpo

### Fase 3: Validação (Semana 4)
1. Comparar schema migrado com o original
2. Executar testes da aplicação
3. Documentar quaisquer diferenças

### Fase 4: Treinamento da Equipe e Lançamento
1. Atualizar documentação
2. Treinar equipe no fluxo de trabalho de migração
3. Atualizar pipelines CI/CD

## Boas Práticas

1. **Migrações Pequenas e Focadas**: Cada migração deve fazer uma coisa
2. **Sempre Incluir Down**: Tornar as migrações reversíveis
3. **Testar Migrações**: Executar up e down no desenvolvimento antes de commitar
4. **Sem Modificações de Dados em Migrações de Schema**: Separar migrações de schema e dados
5. **Usar Transações**: Envolver migrações em transações quando possível
6. **Controle de Versão**: Commitar migrações com mudanças de código relacionadas

## Tratando Funções/Procedimentos Grandes

Para o arquivo de funções de 269KB, considere:

```typescript
// migrations/007_functions.ts
import { MigrationBuilder } from 'node-pg-migrate';
import * as fs from 'fs';
import * as path from 'path';

export async function up(pgm: MigrationBuilder): Promise<void> {
  // Ler definições de função de arquivos SQL separados
  const functionsDir = path.join(__dirname, 'sql', 'functions');
  const files = fs.readdirSync(functionsDir).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(functionsDir, file), 'utf8');
    pgm.sql(sql);
  }
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  // Remover funções em ordem inversa
  // Ou manter uma lista de nomes de funções para remover
}
```

## Considerações

### Prós:
- Gerenciamento profissional de migrações
- Melhor para equipes e produção
- Suporta cenários complexos de implantação
- Abordagem padrão da indústria

### Contras:
- Esforço inicial de configuração necessário
- Curva de aprendizado da equipe
- Necessidade de converter arquivos SQL existentes
- Mais complexo que SQL puro para schemas simples

## Recomendação

Dada a complexidade do PlenejaGov (100+ tabelas, 269KB de funções, múltiplos desenvolvedores), implementar o node-pg-migrate forneceria:

1. **Melhor manutenibilidade** para o schema em crescimento
2. **Implantações mais seguras** com capacidades de rollback
3. **Histórico de mudanças claro** para depuração
4. **Integração mais fácil** para novos desenvolvedores
5. **Gerenciamento de banco de dados** de nível profissional

O investimento inicial em configuração trará dividendos à medida que a aplicação cresce e a equipe se expande.
