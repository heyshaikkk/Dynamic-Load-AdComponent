const mongoose=require('mongoose');

const birdsSchema=new mongoose.Schema({
    name:{
        type: String,
        required:'This field is Required.'
    },
    image:{
        type: String,
        required:'This field is Required.'
    }

});


const birds=mongoose.model('birds', birdsSchema);

module.exports = birds;


