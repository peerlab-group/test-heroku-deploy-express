const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = [];

app.get("/repositories", (request, response) => {
  
  // List all repositories
  return response.status(200).json(repositories)

});

app.post("/repositories", (request, response) => {
  
  // Destructure title, url and techs from request.body
  const {title, url, techs} = request.body;

  // Create project object
  const project = {
    id: uuid(),
    title,
    url,
    techs,  
    likes: 0
  }

  // Add project to list of repositories
  repositories.push(project);

  // Send response with status 200 and project data
  response.status(200).json(project);

});

app.put("/repositories/:id", (request, response) => {
  // Get id from route params
  const { id } = request.params;

  // Check if id exists
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // If id don't exist return error message
  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository not found."});
  }

  // If id exists, get title, url and techs from body
  const {title, url, techs} = request.body;

  // Restore repository from list
  const repository = repositories[repositoryIndex];

  

  // Update project with data from body
  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  // Return updated repository
  return response.status(200).json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // Get id from params
  const { id } = request.params;

  // Find index of repository with same id
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // If index don't exist, return error
  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository not found."});
  }

  // If index exists, delete repository 
  repositories.splice(repositoryIndex, 1);

  // Send feedback response
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // Get id from params
  const { id } = request.params;

  // Find index of repository with same id
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // If index don't exist, return error
  if(repositoryIndex < 0){
    return response.status(400).json({error: "Repository not found."});
  }

  // Restore repository from list
  const repository = repositories[repositoryIndex];

  // Update project number of likes
  repository.likes += 1;

  // Send feedback response
  return response.status(200).json({likes: repository.likes});
});

module.exports = app;
