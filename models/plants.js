const mongoose=require('mongoose');

const plantsSchema=new mongoose.Schema({
    name:{
        type: String,
        required:'This field is Required.'
    },
    image:{
        type: String,
        required:'This field is Required.'
    }

});
const plants=mongoose.model('plants', plantsSchema);

module.exports = plants;