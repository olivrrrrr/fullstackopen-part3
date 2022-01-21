const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
require('dotenv').config()



const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const Person = require('./models/person')
const { response } = require('express')

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
        if(people){
            res.json(people)
        } else {
            res.status(404).end()
        }
        })
        .catch(error=>{
            next(error)
        })
    }
)

app.get('/info',(req,res)=>{

Person.find({}).then(people => {console.log(people) 
    res.send(`<p>Phonebook has info for ${people.length} people.<br>${new Date().toString()}</br></p>`)})

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
            if(people){
                res.json(people)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
    })

app.delete("/api/persons/:id", (req, res)=>{
    // const id = Number(req.params.id)
    // persons = persons.filter(person=> person.id !== id)
    // res.status(204).end()

    Person.findByIdAndRemove(req.params.id).then(people => {
        res.status(204).end()
    })
    .catch(error => next(error))
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


app.put('/api/persons/:id',(req, res, next)=>{
    const body = req.body 

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson=> {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
    })


const errorHandler = (error, request, res, next) =>{
    console.error(error.message)

    if(error.name === 'CastError'){
        return res.status(400).send({error:'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
