const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
require('dotenv').config()



const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const Person = require('./models/person')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res)=>{
        Person.find({}).then(people => {
            res.json(people)
        })
    }
)

app.get('/info',(req,res)=>{
    res.send(`<p>Phonebook has info for ${persons.length} people.
    <br>${new Date().toString()}</br></p>`)
})

app.get('/api/persons/:id', (req,res) =>{
    // const id = Number(req.params.id)
    // const person = persons.find(person=>person.id === id)
    //     if(person){
    //         res.json(person)
    //     } else {
    //         res.status(404).end()
    //     }

        Person.findById(req.params.id).then(people => {
            res.json(people)
        })
    })

app.delete("/api/persons/:id", (req, res)=>{
    // const id = Number(req.params.id)
    // persons = persons.filter(person=> person.id !== id)
    // res.status(204).end()

    Person.findByIdAndRemove(req.params.id).then(people => {
        res.status(204).end()
    })
})

// const randomNumberGenerator = () => {
//     return Math.floor(Math.random()*10000)
// }

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time :body'), (req, res)=>{

    const body = req.body

    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'missing name or number'
        })
    }

    // if(persons.find(person=>person.name===body.name)){
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person ({
        name: body.name, 
        number: body.number
    })

    // persons = persons.concat(person)

    person.save().then(savedPerson=>{
        res.json(savedPerson)
    })
    
})


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
