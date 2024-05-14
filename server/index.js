const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const route = require("./route");
const { findUser,loginUser, createNewUser, getUserRooms,newMessage, createRoom, joinRoom, connectToRandomRoom, leaveRoom } = require("./utils");
const { register } = require("module");
const app = express();

app.use(cors({origin: '*'}))
app.use(route)

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST'],
    },
})

const systemMessage = (data) =>{
    let message = {
        userName: data.user,
        role: 'admin',
        userRoom: data.roomName,
        message: 'Welcome to our room ',
        // usersInRoom:countUsersInRoom(data.roomName),
        messageDate:data.messageDate,
    }
    newMessage(message)

    return (   
        io.to(data.roomName).emit('message:system',message)
    )
}

const createOrJoin = (socket,funcName,eName,data) =>{
    let answer = funcName(data)
    io.emit(`${eName}:${data.user}`,answer);
    if (answer){
        socket.join(data.roomName);
        systemMessage(data)
    }
}

io.on('connection',(socket)=>{

    socket.on('register',data=>{
        let answer = createNewUser(data)
        io.emit(`login:answer:${data.name}`,answer)
    })

    socket.on('login',data=>{
        let answer = loginUser(data)
        io.emit(`login:answer:${data.name}`,answer)
    })

    socket.on('login:completed',data=>{
        io.emit(`login:rooms:${data}`,getUserRooms(data))
    })

    socket.on('join',data=>{
        let findUserRooms = findUser(data)
        findUserRooms.forEach((room)=>{
            socket.join(room)
        })
    })
 
    socket.on('message',(data)=>{
        io.to(data.userRoom).emit('post',data)
        newMessage(data)
    })  

    socket.on('createRoom',data=>{
        createOrJoin(socket,createRoom,'createRoom',data)
    })
    
    socket.on('joinRoom',data=>{
        createOrJoin(socket,joinRoom,'joinRoom',data)
    })

    socket.on('connectToRandomRoom',data=>{
        let newRoom = connectToRandomRoom(data)
        newRoom && createOrJoin(socket,joinRoom,'joinRoom',{roomName:newRoom.id,user:data.name,messageDate:data.messageDate})
    })

    socket.on('leaveRoom',data=>{
        socket.leave(data.room)
        leaveRoom(data)
        io.emit(`login:rooms:${data.name}`,getUserRooms(data.name))
    })

    socket.on('disconnect',(socket)=>{console.log(`${socket.id} user disconnect`)})
})

server.listen(5000, () => {
    console.log("Server is running");
});