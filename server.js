const express=require('express')
require('dotenv').config()
const app=express()
const dbConnect=require('./config/db')
const userRoute=require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')


app.use(express.json()) //destructur username and password


app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)
const port=process.env.PORT || 5000

app.listen(port,()=>console.log(`Node server started at port ${port}`))