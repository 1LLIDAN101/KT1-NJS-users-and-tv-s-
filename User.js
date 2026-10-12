const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: false,
        trim: true 
    },
    
    last_name: {
        type: String, 
        require: false,
        trim: true 
    },
    
    age: {
        type: Number, 
        require: false,
        trim: true 
    },
    city: {
        type: String, 
        require: false,
        trim: true 
    },
    
})

module.exports = mongoose.model('User', productSchema)