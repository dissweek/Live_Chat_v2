const express = require('express')
const app = express()
const PORT = 5000

const http = require('http').Server(app)
const cors = require('cors')
const socket = require('socket.io')(http,{
    cors:{
        origin:`http://localhost:5173`
    }
}) 

app.get('api',(req,res)=>{
    res.json({
        message:'hello'
    })
})

socket.on('connection',(socket)=>{
    console.log(`${socket.id} user connected`);

    socket.on('disconnect',(socket)=>{
        console.log(`${socket.id} user disconnect`)})
})


http.listen(PORT, ()=>{
    console.log('server is working')
})

