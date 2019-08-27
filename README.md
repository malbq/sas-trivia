# SAS Tech Test - Trivia

O app utiliza os seguintes serviços:

[MongoDB Cloud](https://cloud.mongodb.com): Armazenagem de dados  
[Circle CI](https://circleci.com/signup): Integração contínua  
[Zeit](https://zeit.co/signup): Plataforma de deploy  

## Versões de software utilizado

**Node.js**: v10.14.2
**npm**: 6.4.1

## MongoDBCloud (setup inicial)

Uma aplicação [Stitch](https://www.mongodb.com/cloud/stitch) deve ser criada para ser usada pelo app como serviço de armazenagem de dados.  
Durante a criação, guarde o valor do campo *Stitch Service Name* (default *'mongodb-atlas'*).

## Ambiente de desenvolvimento

1. Faça um fork ou clone deste repositório.
2. `npm install`
3. Crie um arquivo chamado `.env.local` na raiz do projeto com o seguinte conteúdo, substituindo os valores:
    ```
    VUE_APP_STITCH_APP_ID=trivia-xxxxx
    VUE_APP_STITCH_SERVICE=mongodb-atlas
    VUE_APP_DB=trivia
    ```
    *VUE_APP_STITCH_APP_ID: App ID, encontrado na barra lateral do gerenciador da aplicação Stitch*  
    *VUE_APP_STITCH_SERVICE: Campo 'Stitch Service Name' no formulário de criação da aplicação Stitch (geralmente 'mongodb-atlas')*  
    *VUE_APP_DB: Nome do banco de dados*
4. `npm run dev`

## Testes

Os testes unitários utilizam o framework de testes [Jest](https://jestjs.io).  
Para executá-los: `npm run test:unit`

Os testes de integração (UI) utilizam a ferramenta [Cypress](https://www.cypress.io).  
Para executar no navegador: `npm run test:ui`  
Para executar somente no terminal (headless): `npm run test:hlui`

## Deploy

O app está configurado para rodar na plataforma [Zeit](https://zeit.co).

### Manual

Para fazer deploy manual para o Zeit, você deve usar o programa [now](https://www.npmjs.com/package/now):
```
npm install -g now
npm run build
now login
now dist -A ../now.json
```

### Integração contínua

Foi utilizado o [CircleCI](https://circleci.com) para CI/CD, com apenas um job, executado sempre que é feito um `git push` para o repositório do Github.

A configuração pode ser conferida no arquivo `.circleci/config.yml`.

Para CI/CD funcionar é necessário configurar algumas coisas primeiro:

#### Zeit: Autenticação

Gerar um token de acesso que será utilizado pelo CircleCI para autenticação:

*Settings* > *Tokens* > *Create*  
New Token Name: *CI*  
*Create Token* > *Copy token*

#### MongoDB Stitch: Permitir origem (CORS)

Para que o app consiga acessar o banco de dados, o endereço do app no Zeit deverá ser adicionado à lista de origens autorizadas no Stitch:

*Settings* > *Allowed Request Origins* > *+ Add Allowed Request Origin*  
Digite: `https://trivia.<username>.now.sh/`  
*Save*  
*Deploy* > *Review & Deploy Changes* > *Deploy*

#### CircleCI: Variáveis de ambiente

Por último, no gerenciador do CircleCI clique em *Project Settings* (a engrenagem à direita do nome do projeto), depois em *Build Settings > Environment Variables* e adicione as seguintes variáveis:

- Name: *NOW_TOKEN*  
    Value: *\<token do Zeit>*
- Name: *VUE_APP_STITCH_APP_ID*  
    Value: *\<mesmo valor de .env.local>*
- Name: *VUE_APP_STITCH_SERVICE*  
    Value: *\<mesmo valor de .env.local>*
- Name: *VUE_APP_DB*  
    Value: *\<mesmo valor de .env.local>*

# App

`https://trivia.<username>.now.sh`

# Demo

https://trivia.maurogadelha.now.sh
