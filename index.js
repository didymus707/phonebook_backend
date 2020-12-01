const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());

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
  },
  {
    id: 5,
    name: "Fadekemi",
    number: "08034274531"
  }
]

const generateId = () => {
  const ids = persons.map(person => person.id);
  return Math.floor(Math.random() * 100);
};

app.get('/', (request, response) => {
  response.send("<h1>Welcome to Didymus' Phonebook Backend App</h1>")
});

app.get('/api/persons', (request, response) => {
  response.send(persons);
});

app.get('/info', (request, response) => {
  const pageDetails = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `;
  response.send(pageDetails);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  person ? response.json(person) : response.status(404).end()
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  const name = persons.find(person => person.name === body.name);
  const number = persons.find(person => person.number === body.number);

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: 'Name or number is missing'
    })
  } else if (name || number) {
    return response.status(404).json({
      error: 'Name or Number already exists in the phonebook'
    })
  }
  
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons.push(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});