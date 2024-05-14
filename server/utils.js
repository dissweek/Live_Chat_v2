let users = [
    {
        name:'ssss',
        password:'qwerty123',
        rooms:['2','3','54']
    },
    {
        name:'aaa',
        password:'qwerty123',
        rooms:['3','54']
    },
    {
        name:'dead',
        password:'qwerty123',
        rooms:['4']
    },
]

let rooms = [
    {
        id:'2',
        users:[
            {name:'ssss',joinInRoom:1713031921095},
        ],
        isOpen:true,
        messages:[
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "2",
                messageDate: 1713031921095
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "2",
                messageDate: 1713031921095
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "girl",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "2",
                messageDate: 1713031921095
            },
        ]
    },
    {
        id:'3',
        users:[
            {name:'ssss',joinInRoom:1713031920375},
            {name:'aaaa',joinInRoom:1713031920385},
        ],
        isOpen:true,
        messages:[
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "3",
                messageDate: 1713031920375
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: "a",
                userRoom: "3",
                messageDate: 1713031920385
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "girl",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "3",
                messageDate: 1713031920395
            },
        ]
    },
    {
        id:'54',
        users:[
            {name:'ssss',joinInRoom:1713031920375},
            {name:'aaaa',joinInRoom:1713031920385},
        ],
        isOpen:true,
        messages:[
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "54",
                messageDate: 1713031920195
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "54",
                messageDate: 1713031920195
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "girl",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "54",
                messageDate: 1713031920195
            },
        ]
    },
    {
        id:'4',
        users:[
            {name:'dead',joinInRoom:1713031420195},
        ],
        isOpen:true,
        messages:[
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "4",
                messageDate: 1713031420195
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "4",
                messageDate: 1713031420195
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "girl",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "4",
                messageDate: 1713031420195
            },
        ]
    },
    {
        id:'42',
        users:[],
        isOpen:true,
        messages:[
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "4",
                messageDate: 1713031420195
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "go",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "4",
                messageDate: 1713031420195
            },
            {
                id: "g4GZga-C1nMN3TA5AAAB",
                message: "girl",
                socketID: "g4GZga-C1nMN3TA5AAAB",
                userName: 'ssss',
                userRoom: "4",
                messageDate: 1713031420195
            },
        ]
    }
]

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

const getUserRooms = (name) =>{
    let roomsList = users.find((u) => (u.name === name))?.rooms
    let userRooms = []

    roomsList && roomsList.forEach(id=>{
        return userRooms.push(...rooms.filter(r=>r.id == id))
    })

    userRooms.sort((a,b)=>{
        if (a.messages?.at(-1)?.messageDate < b.messages?.at(-1)?.messageDate){ return 1 }
        if (a.messages?.at(-1)?.messageDate > b.messages?.at(-1)?.messageDate){ return -1 }
        return 0
    })

    return userRooms
}

const findUser = (user) =>{
    let find = users.find((u) => (u.name === user.name))
    return find.rooms
}

const createNewUser = (user) =>{
    let find = users.find((u) => (u.name === user.name))
    if (!find) {
        users.push({...user,rooms:[]})
        return true
    } else {
        return 'This name is already taken'
    }
}

const loginUser = (user) =>{
    let find = users.find((u) => (u.name === user.name))
    console.log(find)
    if (find?.password === user.password){
        return true
    } else {
        return 'Incorrect Username or Password'
    }
}

const newMessage = (data) =>{
    rooms.forEach(room=>{
        room.id === data.userRoom && room.messages.push(data)
    })
}

const createRoom = (data) =>{
    let newRoomAnswer = false
    let find = rooms.find(r=>(r.id === data.roomName))
    let newRoom = {id:data.roomName,users:[{name:data.user,joinInRoom:data.messageDate}],isOpen:data.isOpen,messages:[]}

    if  (!find) {
        rooms.push(newRoom)
        users.forEach(u=>{
            u.name === data.user && u.rooms?.push(data.roomName)
        }) 
        newRoomAnswer = newRoom
    }

    return newRoomAnswer
}

const joinRoom = (data) =>{
    let joinRoomAnswer = false
    let find = rooms.find(r=>(r.id === data.roomName))
    console.log(data)

    if  (find) {
        users.forEach(u=>{
            if ((u.name === data.user && !u.rooms?.includes(data.roomName))){
                u.rooms?.push(data.roomName)
                joinRoomAnswer = find
            }
        })
        rooms.forEach(room=>{
            if ((room.id === data.roomName && !room.users.includes(data.user))){
                room.users.push({name:data.user,joinInRoom:data.messageDate})
            }
        })
    }
    return joinRoomAnswer
}

const connectToRandomRoom = (data) =>{
    let availableRooms = rooms.filter(room=>{
        if (!room.isOpen) return
        let checkRoom = room.users.find(u=>u.name === data.name)
        if (!checkRoom) return room
    })
    let newRoom = availableRooms[getRandomInt(availableRooms.length)]
    console.log(newRoom)
    return newRoom
}

const leaveRoom = (data) =>{
    rooms.map(room=>{
        if (room.id === data.room && room.users.includes(data.name)) {
            room.users = room.users.filter(user=>user != data.name)
        }
    })
    users.map(user=>{
        if (user.name === data.name && user.rooms.includes(data.room)) {
            user.rooms = user.rooms.filter(room=>room != data.room)
        }
    })
}


module.exports = {users,findUser,loginUser ,createNewUser,getUserRooms, newMessage, createRoom, joinRoom, connectToRandomRoom,leaveRoom}