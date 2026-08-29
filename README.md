# Identidade Local — Interface

Interface web do sistema educacional **Identidade Local**. O client permitirá
cadastro, login, consulta de CEP, edição de perfil e gerenciamento de sessões
por meio da API própria.

## Tecnologias

- React e TypeScript
- Vite
- React Router

## Estrutura

```text
src/
├── components/  # componentes reutilizáveis
├── pages/       # telas da aplicação
├── routes/      # definição de rotas
├── services/    # chamadas à API
└── types/       # contratos TypeScript
```

## Requisitos

- Node.js 24 ou superior
- npm

## Configuração local

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env`.
3. Inicie o ambiente de desenvolvimento com `npm run dev`.

O endereço padrão será `http://localhost:5173`. A variável `VITE_API_URL` deve
apontar para a API, em desenvolvimento `http://localhost:8000`.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Verifica os tipos e gera a versão de produção. |
| `npm run lint` | Executa o Oxlint. |
| `npm run preview` | Serve localmente o build de produção. |

As telas, rotas protegidas e integração HTTP serão adicionadas nas próximas
etapas.

## Docker

Construa a imagem no diretório deste repositório com:

```bash
docker build -t identidade-local-client .
```

Execute-a com:

```bash
docker run --rm -p 5173:5173 identidade-local-client
```

## Docker Compose

O arquivo `docker-compose.yml` inicia a interface e a API juntas. Mantenha os
dois repositórios lado a lado, nas pastas `client` e `api`, e copie
`../api/.env.example` para `../api/.env`, definindo um segredo seguro para
`JWT_SECRET_KEY`.

No diretório da interface, execute:

```bash
docker compose up --build
```

A interface será exposta em `http://localhost:5173` e a API em
`http://localhost:8000`. O Compose preserva o banco SQLite no volume `api_data`.

## Licença

Projeto acadêmico.
