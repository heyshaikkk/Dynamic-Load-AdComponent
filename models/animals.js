const mongoose=require('mongoose');

const animalsSchema=new mongoose.Schema({
    name:{
        type: String,
        required:'This field is Required.'
    },
    image:{
        type: String,
        required:'This field is Required.'
    }

});


const animals=mongoose.model('animals', animalsSchema);

module.exports = animals;
