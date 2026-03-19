Universidade Veiga de Almeida - UVA
Graduação em Análise e desenvolvimento de Sistemas - EAD
Desenvolvimento Backend
Professora: Ana Paula Santos Vasconcelos
Aluno: João Gabriel Barbosa de Mello
Matrícula: 1250116767

Rio de Janeiro, 2026.

# Sistema de Atendimento Inteligente para Clínicas

## Descrição
Sistema completo para clínicas médicas que permite:
- Cadastro de usuários
- Login seguro (JWT)
- Agendamento de consultas
- Consulta de endereço por CEP
- Previsão do clima na cidade da consulta

## Tecnologias utilizadas
- Node.js
- Express
- MongoDB Atlas
- Vue.js
- Axios
- JWT para autenticação

## Estrutura do projeto

frontend: Aplicação Vue.js
backend: API Node.js + MongoDB


## Funcionalidades
- Registro e login de usuários (admin e pacientes)  
- Agendamento de consultas com CEP e previsão do clima  
- Listagem de consultas no painel administrativo  

## Configuração e execução

### Backend
1. Instale dependências:
cd backend
npm install

Configure variáveis de ambiente (.env) com:

MONGO_URI=<sua string de conexão MongoDB>
JWT_SECRET=<segredo para JWT>

Execute o servidor:

node server.js

O backend irá rodar em http://localhost:5000.

Frontend

Instale dependências:

cd frontend
npm install

Configure a variável de ambiente .env na pasta frontend:

VUE_APP_API_URL=http://localhost:5000

Execute o frontend:

npm run dev

O frontend irá rodar em http://localhost:5173.

Links de Deploy

Frontend (Vercel): https://sistema-clinica-gamma.vercel.app/

Backend (Render): https://sistema-clinica-3ex8.onrender.com
