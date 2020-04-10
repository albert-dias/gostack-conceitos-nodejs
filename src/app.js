const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories)
});

app.post("/repositories", (req, res) => {
  const { title, url, techs} = req.body;
  
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return res.json(repository);

});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repoIndex = repositories.findIndex(repository => 
    repository.id === id);

  if(repoIndex < 0){
    return res.status(400).json({error: "Repository does not exist!"})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes,
  };

  repositories[repoIndex] = repository;

  return res.json(repository);

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repoIndex = repositories.findIndex(repository => 
    repository.id === id
  );

  if(repoIndex < 0){
    return res.status(400).json({error: "Repository does not exist!"})
  }

  if(repoIndex >= 0){
    repositories.splice(repoIndex, 1);
  }
  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  
  const repoIndex = repositories.findIndex(repository => 
    repository.id === id
  );

  if(repoIndex < 0){
    return res.status(400).json({error: "Repository does not exist!"})
  }

  repositories[repoIndex].likes += 1;

  return res.json(repositories[repoIndex]);
});

module.exports = app;
