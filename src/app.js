/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;  
* Desafio 02: Conceitos do Node.js;
*/
const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
   const { title } = request.query;
   const results = title ? repositories
      .filter(reposity => reposity.title.includes(title)) : repositories;
   response.json(results);
});

app.post("/repositories", (request, response) => {
   const { title, url, techs } = request.body;
   const repository = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
   };
   repositories.push(repository);
   return response.json(repository);
});

/**
 * @param Int id
 */
app.put("/repositories/:id", (request, response) => {
   const { id } = request.params;
   const { title, url, techs } = request.body;
   const repositoryIndex = repositories
      .findIndex(repository => repository.id === id);
   if (repositoryIndex < 0) {
      return response.status(400).json({
         error: 'Repositório não encontrado'
      });
   }
   const repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[repositoryIndex].likes
   }
   repositories[repositoryIndex] = repository;
   return response.json(repository);
});

/**
 * @param Int id
 */
app.delete("/repositories/:id", (request, response) => {
   const { id } = request.params;
   const repositoryIndex = repositories
      .findIndex(repository => repository.id === id);
   if (repositoryIndex < 0) {
      return response.status(400).json({ 
         error: 'Repositório não encontrado' 
      });
   }
   repositories.splice(repositoryIndex, 1);
   return response.status(204).send();
});

/**
 * @param Int id
 */
app.post("/repositories/:id/like", (request, response) => {
   const { id } = request.params;
   const repositoryIndex = repositories
      .findIndex(repository => repository.id === id);
   if (repositoryIndex < 0) {
      return response.status(400).json({ 
         error: 'Repositório não encontrado' 
      });
   }
   repositories[repositoryIndex].likes++;
   return response.json(repositories[repositoryIndex]);
});

module.exports = app;
