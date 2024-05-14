import React, { useEffect, useState } from 'react'
import Room from './components/Room/Room'
import styles from './Chat.module.scss'

import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import RoomList from './components/RoomList/RoomList'
import NoRoom from './components/NoRoom/NoRoom'
import CreateRoom from './components/CreateRoom/CreateRoom'

const Chat = (props) => {
  const {socket} = props
  const navigate = useNavigate()
  const [rooms,setRooms] = useState([])
  const name = localStorage.getItem('name')
  const password = localStorage.getItem('password')
  const [newMessages,setNewMessages] = useState({})
  const [activeRoom,setActiveRoom] = useState()

  const getActiveRoom = (id) => {
    setActiveRoom(id)
  }

  useEffect(()=>{
    socket.emit('login',{name,password})
  },[socket])

  useEffect(()=>{
    socket.on(`login:answer:${name}`,data=>{
      if (data !== true){
        localStorage.removeItem('name')
        localStorage.removeItem('password')
        navigate('/')
      } else {
        socket.emit('login:completed',name)
      }
    })
  },[socket])

  useEffect(()=>{
    socket.emit('join',{name,role:'user'})
  },[socket])

  // message:system
  useEffect(()=>{
    socket.on('message:system',(data)=>{
      // setUsersInRoom(data.usersInRoom)
      setNewMessages(data) ////!!!!
    })
  },[newMessages,socket])
  
  
  //post
  useEffect(()=>{
    socket.on('post',(data)=>{
      setNewMessages(data)
    })
  },[socket])

  useEffect(()=>{
    const updateRooms = rooms.map((room)=>{
      if (room.id === newMessages.userRoom) {
        room.messages?.push(newMessages)
        return room
      } else {
        return room
      }
    })

    updateRooms.sort((a,b)=>{
      if (a.messages.at(-1).messageDate < b.messages.at(-1).messageDate){ return 1 }
      if (a.messages.at(-1).messageDate > b.messages.at(-1).messageDate){ return -1 }
      return 0
    })

    setRooms(updateRooms)
  },[newMessages])



  //rooms
  useEffect(()=>{
    socket.on(`login:rooms:${name}`,data=>{
      data.sort((a,b)=>{
        if (a.messages.at(-1).messageDate < b.messages.at(-1).messageDate){ return 1 }
        if (a.messages.at(-1).messageDate > b.messages.at(-1).messageDate){ return -1 }
        return 0
      })

      console.log(data)
      setRooms(data)
    })
  },[socket])

  useEffect(()=>{
    socket.on(`joinRoom:${name}`,data=>{
      if (data) {
        setNewMessages(data.messages)
        setRooms([...rooms,data])
      }
    })
  },[socket,rooms]) /////////////////////////////// ??????????

  const roomMessages = () =>{
    let filter = rooms.filter((room)=>room.id === activeRoom)
    return filter[0]?.messages || [] //????
  }
  
  const roomUsers = () =>{
    let filter = rooms.filter((room)=>room.id === activeRoom)
    return filter[0]?.users || [] //????
  }

  const propsSetRooms = (a) =>{
    setRooms(a)
  }

  return (
    <div className={styles.chat}>
      <div className={`${styles.roomList} ${activeRoom && styles.roomList_hide}`}>
        <Link to={'/chat'} onClick={()=>setActiveRoom(false)} className={styles.roomList_title}>
          <span className={styles.roomList_title_span}>Aleatory</span>
          <div className={styles.roomList_title_decorateLine}></div>
          <span className={styles.roomList_title_span}>Meeting</span>
        </Link>
          <CreateRoom socket={socket} setRooms={propsSetRooms} rooms={rooms} name={name}  />
        <div className={styles.roomList_block}>
          {rooms?.map((r,index)=>{
            return <RoomList key={r+index} room={r} activeRoom={activeRoom} />
          })}
        </div>
      </div >
       
      <Routes>
        <Route exact path='/' element={<NoRoom />} />
        <Route path='/:room' element={<Room socket={socket} getActiveRoom={getActiveRoom} usersInRoom={roomUsers()} roomMessages={roomMessages()} />} />
      </Routes>
    </div>
  )
}

export default Chat