// const users=require('../model/usermodel')
// const jwt=require('jsonwebtoken')

// exports.register=async(req,res)=>{
//     console.log('inside the register funtion');
//     const{userId,firstname,lastname,email,password}=req.body
//    try{
// const existUser =await users.findOne({email})
// console.log('fghbfdg');
// console.log(existUser);
// if(existUser){
//    res.status(406).json('user already exist !! please login....')
// }else{
//    const newUser =users({
//     userId,firstname,lastname,
//     email,password
//    })
//    await newUser.save()
//    res.status(200).json(newUser)
// }

//    }catch(err){
//    res.status(401).json(err)
//    }
// }

// exports.login=async(req,res)=>{
//     const {email,password}=req.body
//     try{
//     const existingUser =await users.findOne({email,password})
//  if(existingUser){
//    const token =jwt.sign({userId:existingUser._id},process.env.JWT_SECRET)
//    res.status(200).json({token,existingUser})
//  }else{
//     res.status(406).json("invalid data")
//  }
//     }catch(err){
//  res.status(401).json(err)
//     }
//  }
//  exports.allusersController =async (req,res)=>{
//     try{
//  const allusers= await users.find()
 
//  res.status(200).json(allusers)
//     }catch(err){
//  res.status(401).json(err)
//     }
//  }