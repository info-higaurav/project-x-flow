import dotenv from 'dotenv'
import app from "./app";
import connectToDb from '../config/connectToDb';

dotenv.config({
    path:"./.env"
})

const port = process.env.PORT || 5000

connectToDb()
.then((con)=>{

    console.log("Connection established at " + con.connection.host)
    app.listen(port,()=>{
        console.log("Server Status Ok on PORT " + port)
    })
})
.catch((err)=>{
    console.log(err)
    process.exit(1)
})