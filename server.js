const dotenv=require('dotenv')
const express = require('express')
const morgan = require('morgan') //allows us to log the requests whenever the module is used
const app = express()
const path = require('path')
const bodyparser=require('body-parser')
 const xlsx = require('xlsx');
const connectDB=require('./server/database/connection')  //------>from connection.js
const importData=require('./server/excelimport/importstudents')
const cors=require('cors')
app.use(cors({
    origin: '*'
  }));
app.use(express.json())
dotenv.config({path:'config.env'})
const PORT =process.env.PORT  || 5000

app.use(morgan('tiny'))  //gives the type of request made and the path


//mongodb connection

connectDB();
//importData();
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

//adding the routes
app.use('/',require('./server/routes/router'))   //---->from router.js

app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`))