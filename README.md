# SAS Tech Test - Trivia

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

## Deploy

Variáveis de ambiente:

- PUBLIC_PATH=/sas-trivia/
- STITCH_APP_ID=trivia-uleiu
- STITCH_LINKED_CLUSTER=maurodev-trivia
- DB_NAME=trivia

### MongoDBCloud setup

#### Stitch App

Settings > Allowed Request Origins > + Add Allowed Request Origin > Save
Deploy > Review & Deploy Changes > Deploy

### Zeit

Settings > Tokens > Create
New Token Name: CI
Create Token
Copy token

### Circle CI Setup

Project Settings > Build Settings/Environment Variables > Add Variable
Name: NOW_TOKEN
Value: Token from Zeit

## Run

https://trivia.<username>.now.sh/