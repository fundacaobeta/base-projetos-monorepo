Todos os DDLs, DMLs e migrações de banco de dados relacionados à aplicação devem ser armazenados aqui.

# Banco de Dados PlenejaGov

## Estrutura de Diretórios

- `sql/` - Contém todos os arquivos SQL necessários para inicialização do banco de dados
- `migrations/` - Contém scripts de migração do banco de dados
- `00-init-db.sh` - Script de inicialização que executa os arquivos SQL na ordem correta

## Ordem de Execução dos Arquivos SQL

Os arquivos de inicialização do banco de dados devem ser executados na seguinte ordem:

1. `sql/0_extensions.sql` - Extensões PostgreSQL
2. `sql/1_tables.sql` - Definições de tabelas e restrições
3. `sql/indexes.sql` - Todos os índices do banco de dados
4. `sql/4_functions.sql` - Funções do banco de dados
5. `sql/triggers.sql` - Triggers do banco de dados
6. `sql/3_views.sql` - Views do banco de dados
7. `sql/2_dml.sql` - Instruções de Linguagem de Manipulação de Dados (inserções, atualizações)
8. `sql/5_database_user.sql` - Configuração do usuário do banco de dados

## Configuração Baseada em Docker

No ambiente Docker, usamos um script shell chamado `00-init-db.sh` para controlar a ordem de execução dos arquivos SQL:

1. O script shell cria um subdiretório `sql/` se ele não existir
2. Ele copia todos os arquivos .sql para este subdiretório
3. Executa os arquivos SQL do subdiretório na ordem correta

Esta abordagem evita que os arquivos SQL sejam executados duas vezes pelo mecanismo de inicialização automática do Docker, o que causaria erros para objetos que já existem.

## Configuração Manual

Se estiver configurando o banco de dados manualmente, siga a ordem de execução listada acima. Certifique-se de que seus arquivos SQL estejam no subdiretório `sql/` antes de executar o script.
