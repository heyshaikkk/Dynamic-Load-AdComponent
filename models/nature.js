const mongoose=require('mongoose');

const natureSchema=new mongoose.Schema({
    name:{
        type: String,
        required:'This field is Required.'
    },
    image:{
        type: String,
        required:'This field is Required.'
    }

});

const nature=mongoose.model('nature', natureSchema);

module.exports = nature;