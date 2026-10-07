# HEROES — front preparado para Google Play

Branch de trabalho: `feat/pokerinno-frontend`.

## Entrada do app
O shell Android deve abrir o arquivo local `dist/index.html`. O front inicia na tela de login e não possui atalho de prévia para entrar no conteúdo.

## Contratos esperados do shell/app
O front não inventa autenticação nem dados. O aplicativo nativo deve expor, quando os serviços estiverem conectados:

- `window.StackUpAuthAdapter.signIn({ method, locale, email?, password? })`
- `window.StackUpAuthAdapter.signUp({ method, locale, name, email, password })`
- sucesso de autenticação: retornar objeto com `authenticated: true`
- métodos previstos em `signIn`: `google`, `biometric` e `stackup`
- `window.StackUpHeroesAdapter.load()` para carregar dados reais do HEROES

Sem adapter real, a interface mantém o acesso bloqueado e informa indisponibilidade do serviço.

## Requisitos do WebView
- JavaScript habilitado.
- DOM Storage e Session Storage habilitados.
- Conteúdo carregado localmente no pacote do app.
- Safe areas respeitadas no topo, laterais e rodapé.
- O backend deve continuar sendo a camada responsável por autorização real de dados; o gate do front serve apenas ao fluxo de interface.

## Verificação
Executar `npm test`. Os testes cobrem rotas/dados vazios e também os requisitos mínimos do front para publicação.
