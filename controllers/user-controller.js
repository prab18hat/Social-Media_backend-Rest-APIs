import User from "../model/User.js";
import bycrypt from "bcryptjs";

 export const getAllUsers = async (req, res,next) => {
    let users;
    try {
        users = await User.find();
    
    } catch (error) {
      return  console.log(error);
    }
   if(!users){
     return res.status(404).json({message:"No users found"});
    }
    return res.status(200).json({users});
};
export const  signup = async (req, res,next) => {
    const { name, email, password } = req.body;
    let existingUser;
   try {
    existingUser=   await  User.findOne({email:email});
    
   } catch (error) {
     console.log(error);
   }
    if(existingUser){
     return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword = bycrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password: hashedPassword ,
        blogs:[],
    });
   

    try {
        await user.save();
    } catch (error) {
      return  console.log(error);
    }
    return res.status(201).json({user});
}
 
 export const login = async (req,res,next)=>{
   const {email,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });

    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found by this email" });
    } 
    const isPasswordCorrect = bycrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ message: "Logged in" });

}   