import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";


const app = express();
app.use(express.json()); 
app.use("/api/user",router); 
app.use("/api/blog",blogRouter); 
mongoose
.connect(
    "mongodb+srv://Prabhat18:Vishu3000%40@cluster3.onv2z.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster3"

)
.then(()=>app.listen(5000))
.then(()=>
    console.log("Server is running")
)
.catch((err)=>console.log(err)); 


