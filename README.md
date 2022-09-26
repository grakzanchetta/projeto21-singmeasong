# <p align = "center"> Projeto 21 - Sing me a Song </p>

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg" width= 250/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Gabriel Rak Zanchetta-4dae71?style=flat-square" />
</p>


## Descrição

Este é o vigésimo primeiro projeto do Bootcamp da Driven. O template foi entregue totalmente funcional, front e back end (instruções para rodar localmente à seguir). Entretanto, o mote deste projeto é a implementação de testes automatizados, a ver: End-to-End no front-end com o Cypress, Unitários e de Integração no back-end com o Jest. Nesse ultimo, os testes unitários abordaram apenas a camada de serviçoes.

***

## Tecnologias e Conceitos

- JEST, Supertest
- Cypress
- Node.js
- TypeScript
- Prisma

***

## Rotas

```json
POST /recommendations
    - Rota para cadastrar uma recomendação
    - body:{
        "name": "Lorem ipsum",
        "youtubeLink": "www.youtube.com/seu-link",
}
```
    
```json
POST /recommendations/:id/upvote
    - Rota para votar positivamente numa recomendação. Não espera nada no corpo
```
```json
POST /recommendations/:id/upvote
    - Rota para votar negativamente numa recomendação. Não espera nada no corpo. Se a recomendação tiver uma pontuação abaixo de -5 ela é removida do banco de dados.
```
    
```json
GET /recommendations
    - Lista as 10 ultimas recomendações do banco
    -body:
    [
	{
		"id": 1,
		"name": "Chitãozinho E Xororó - Evidências",
		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
		"score": 245
	},
    {
		"id": 2,
		"name": "Chitãozinho E Xororó - Evidências de Tras pra frente",
		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
		"score": 145
	}
    ]
```

```json
GET /recommendations/:id
    -Rota para pegar dados de uma recomendação pelo id
    -body: {
		"id": 1,
		"name": "Chitãozinho E Xororó - Evidências",
		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
		"score": 245
	}
``` 

```json
GET /random/
    - Rota para pegar uma recomendação aleatória
    -Body: {
		"id": 2,
		"name": "Chitãozinho E Xororó - Evidências de Tras pra frente",
		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
		"score": 145
	}
```
 
```json
GET /top/:amount
    - Rota para pegar as X recomendações mais votadas, com um limite de 10.
    -body:
    [
	{
		"id": 1,
		"name": "Chitãozinho E Xororó - Evidências",
		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
		"score": 245
	},
    {
		"id": 2,
		"name": "Chitãozinho E Xororó - Evidências de Tras pra frente",
		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
		"score": 145
	},
     {
		"id": 3,
		"name": "Chitãozinho E Xororó - Evidências de Frente pra Tras",
		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
		"score": 45
	}
    ]
```
***

## 🏁 Rodando a aplicação

Este projeto foi inicializado com o [Create React App](https://github.com/facebook/create-react-app), então certifique-se que voce tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/grakzanchetta/projeto21-singmeasong
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias, na pasta front-end, e na pasta back-end.

```
npm install
```
Depois, para inicializar o banco de dados, utilize os seguintes comandos dentro da pasta back-end

```
npx prisma generate
```

e depois:


```
npx prisma migrate dev
```

Finalizado o processo, é só inicializar o servidor front-end com
```
npm run start
```

E do back-end com
```
npm run dev
```
Para rodar os testes automatizados, na pasta do front-end use o comando: (testes e2e)
```
npx cypress open
```
Para rodar os testes automatizados, na pasta do back-end use o comando: (testes unitários)
```
npm run test:unit
```
Para rodar os testes automatizados, na pasta do back-end use o comando: (testes de integração)
```
npm run test
```