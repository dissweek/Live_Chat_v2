import React, { useEffect, useState } from 'react'
import Room from './components/Room/Room'
import styles from './Chat.module.scss'

import { Route, Routes } from 'react-router-dom'
import RoomList from './components/RoomList/RoomList'
import NoRoom from './components/NoRoom/NoRoom'



const Chat = (props) => {
  const {name,socket} = props
  const [rooms,setRooms] = useState([])
  const localName = localStorage.getItem('name')
  const [messages,setMessages] = useState([])
  const [activeRoom,setActiveRoom] = useState()
  const [usersInRoom,setUsersInRoom] = useState([])

  const getActiveRoom = (id) => {
    setActiveRoom(id)
  }

  // message:system
  useEffect(()=>{
    socket.on('message:system',(data)=>{
      setUsersInRoom(data.usersInRoom)
      setMessages([...messages,data])
    })
  },[messages,usersInRoom])

  //post
  useEffect(()=>{
    socket.on('post',(data)=>{
      setMessages([...messages,data])
    })
    console.log('first:',messages)
  },[messages])

  useEffect(()=>{
    console.log(activeRoom)
  },[activeRoom])

  useEffect(()=>{
    name ? socket.emit('login:completed',name) : socket.emit('login:completed',localName)
  },[socket])

  useEffect(()=>{
    socket.on(`login:rooms:${name ? name : localName}`,data=>{
      setRooms(data)
    })
  },[socket])

  useEffect(()=>{
    setRooms(rooms)
  },[rooms])


  const filterMessages = () =>{
    let filter = messages.filter((m)=>m.userRoom == activeRoom)
    // console.log(filter)
    return filter
  }



  return (
    <div className={styles.chat}>

      <div className={styles.roomList_container}>
        {rooms.map((r,index)=>{
          return <RoomList key={r+index} room={r} />
        })}
      </div >
       
      <Routes>
        <Route exact path='/' element={<NoRoom />} />
        <Route path='/:room' element={<Room socket={socket} getActiveRoom={getActiveRoom}  roomMessages={filterMessages()} />} />
      </Routes>
      {/* <Room socket={socket} props={{messages,name,user,usersInRoom}}  /> */}
    </div>
  )
}

export default Chat