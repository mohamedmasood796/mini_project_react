const mongoose = require('mongoose')

const connect = mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection

connection.on('connected', () => {
    console.log('Mongodb is connected');
})

connection.on('error', (err) => {
    console.log('error in  mongodb connection', err);
})

module.exports=mongoose