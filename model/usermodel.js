const mongooes =require('mongoose')

const userschema =new mongooes.Schema({

    userId:{
        type:String,
        required:true
    
     },
    firstname:{
        type:String,
         
     },
     lastname:{
        type:String,
       
     },
     email:{
         type:String,
         required:true,
        
     },
     password:{
         type:String,
        
     }

})
const users =mongooes.model('users',userschema)
module.exports=users