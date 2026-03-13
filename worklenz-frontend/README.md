# PlenejaGov - Frontend React

PlenejaGov é uma plataforma de gerenciamento de projetos construída com React, TypeScript e Ant Design. O projeto é empacotado usando [Vite](https://vitejs.dev/).

## Sumário

- [Primeiros Passos](#primeiros-passos)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuindo](#contribuindo)
- [Saiba Mais](#saiba-mais)
- [Licença](#licença)

## Primeiros Passos

Para começar com o projeto, siga estes passos:

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/Worklenz/worklenz.git
   ```
2. **Navegue até o diretório do projeto**:
   ```bash
   cd worklenz/worklenz-frontend
   ```
3. **Instale as dependências**:
   ```bash
   npm install
   ```
4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
5. Abra [http://localhost:5000](http://localhost:5000) no seu navegador para visualizar a aplicação.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`

Executa o aplicativo no modo de desenvolvimento.
Abra [http://localhost:5000](http://localhost:5000) para visualizá-lo no navegador.

A página será recarregada se você fizer edições.
Você também verá erros de lint no console.

### `npm run build`

Compila o aplicativo para produção na pasta `dist`.
Ele empacota o React corretamente no modo de produção e otimiza o build para a melhor performance.

O build é minificado e os nomes de arquivo incluem os hashes.
Seu aplicativo está pronto para ser implantado!

### `npm run preview`

Serve o build de produção localmente para testes.
Abra [http://localhost:4173](http://localhost:4173) para visualizar o build.

## Estrutura do Projeto

O projeto está organizado em torno de uma estrutura baseada em funcionalidades:

```
src/
├── components/        # Componentes UI reutilizáveis
├── hooks/             # Hooks React customizados
├── lib/               # Lógica específica de funcionalidades
├── pages/             # Componentes de rota
├── services/          # Serviços de API
├── shared/            # Utilitários, constantes e tipos compartilhados
├── store/             # Gerenciamento de estado global
├── types/             # Definições de tipos TypeScript
├── utils/             # Funções utilitárias
├── App.tsx            # Componente principal da aplicação
└── main.tsx           # Ponto de entrada da aplicação
```

## Contribuindo

Contribuições são bem-vindas! Se deseja contribuir, siga estes passos:

1. Faça um fork do repositório.
2. Crie um novo branch (`git checkout -b feature/NomeDaSuaFuncionalidade`).
3. Faça commit das suas alterações (`git commit -m 'Adicionar alguma funcionalidade'`).
4. Faça push para o branch (`git push origin feature/NomeDaSuaFuncionalidade`).
5. Abra um pull request.

## Saiba Mais

Para saber mais sobre as tecnologias usadas neste projeto:

- [Documentação do React](https://react.dev/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Ant Design](https://ant.design/docs/react/introduce)
- [Documentação do Vite](https://vitejs.dev/guide/)

## Licença

PlenejaGov é open source e lançado sob a [Licença Pública Geral GNU Affero Versão 3 (AGPLv3)](LICENSE).
