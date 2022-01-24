const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('connected to Mongoose')
    })
    .catch(error =>{
        console.log('error conntect to MongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type:String, 
        minlength: 3,
        required: true,
        unique: true   
    }, 
    number: {
        type:String,
        minlength: 8,
        required: true,
        unique: true    
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema)