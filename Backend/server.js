import "dotenv/config"
import app from "./src/app.js"
import connectToDb from "./src/config/Database.js"



connectToDb()
app.listen(3000,()=>{
    console.log("Server Start ...");
    
})