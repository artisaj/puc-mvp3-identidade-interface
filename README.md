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
etapas. A execução por contêiner será documentada com o `Dockerfile` e o Docker
Compose nesta interface.

## Licença

Projeto acadêmico.
