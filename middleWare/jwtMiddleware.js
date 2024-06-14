
const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{

    console.log("inside jwt middleware");
    try{
        
     
        console.log("fgx");
    const token =req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token){
        const jwtResponse =jwt.verify(token,process.env.JWT_SECRET)
        req.payload =jwtResponse.userId
        console.log('hhhhxc');
        next()
    }else{
        res.status(401).json("provide token")
    }
    }catch{
       res.status(403).json("please login")
    }
}
module.exports =jwtMiddleware