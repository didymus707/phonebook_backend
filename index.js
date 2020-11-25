const { request, response } = require('express');
const express = require('express');
const app = express();

let persons = [
  {
    id: 1,
    name: "Darasimi",
    number: "08136934388"
  },
  {
    id: 2,
    name: "Victor",
    number: "08065655924"
  },
  {
    id: 3,
    name: "Mummy",
    number: "08033886680"
  },
  {
    id: 4,
    name: "Emmanuel",
    number: "07062357670"
  }
]

app.get('/', (request, response) => {
  response.send("<h1>Welcome to Didymus' Phonebook Backend App</h1>")
});

app.get('/api/persons', (request, response) => {
  response.send(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  person ? response.json(person) : response.status(404).end();
})

app.get('/info', (request, response) => {
  const pageDetails = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `;
  response.send(pageDetails);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});