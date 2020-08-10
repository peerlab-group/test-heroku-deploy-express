const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

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
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
