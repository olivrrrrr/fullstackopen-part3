const mongoose = require('mongoose')

const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://oliverxekwalla:treasure@cluster0.6gu0p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String, 
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3 ){
    
    const person = new Person({
        name: name,  
        number: number
    })

    person.save().then(result=>{
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
    
    })
}

if(process.argv.length === 3){

    Person
        .find({})   
        .then(persons=>{
         console.log(persons)
         mongoose.connection.close()
        })
    
}




