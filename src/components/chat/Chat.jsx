import React, { useEffect, useState } from 'react'
import Room from './components/Room/Room'
import styles from './Chat.module.scss'

import { Route, Routes } from 'react-router-dom'
import RoomList from './components/RoomList/RoomList'
import NoRoom from './components/NoRoom/NoRoom'
import CreateRoom from './components/CreateRoom/CreateRoom'

const Chat = (props) => {
  const {name,socket} = props
  const [rooms,setRooms] = useState([])
  const localName = localStorage.getItem('name')
  const [newMessages,setNewMessages] = useState({})
  const [activeRoom,setActiveRoom] = useState()
  const [usersInRoom,setUsersInRoom] = useState([])

  const getActiveRoom = (id) => {
    setActiveRoom(id)
  }

  useEffect(()=>{
    socket.emit('join',{name:localName,role:'user'})
  },[socket])

  // message:system
  useEffect(()=>{
    socket.on('message:system',(data)=>{
      setUsersInRoom(data.usersInRoom)
      setNewMessages(data) ////!!!!
    })
  },[newMessages,usersInRoom,socket])
  
  
  //post /////////////////////////////  re-work
  useEffect(()=>{
    socket.on('post',(data)=>{
      // let objDate = new Date(data.messageDate)
      // let messageTime = {
      //   year:objDate.getFullYear(),
      //   month:objDate.getMonth(),
      //   day:objDate.getDate(),
      //   hour:objDate.getHours(),
      //   min:objDate.getMinutes(),
      // }
      // data.messageTime = messageTime
      setNewMessages(data)
      console.log(data)
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

  useEffect(()=>{
    name ? socket.emit('login:completed',name) : socket.emit('login:completed',localName)
  },[socket])

  //rooms
  useEffect(()=>{
    socket.on(`login:rooms:${name ? name : localName}`,data=>{
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
    socket.on(`joinRoom:${localName}`,data=>{
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
      <div className={styles.roomList_container}>
        <CreateRoom socket={socket} setRooms={propsSetRooms} rooms={rooms} name={localName}  />
        {rooms?.map((r,index)=>{
          return <RoomList key={r+index} room={r} rooms={rooms} />
        })}
      </div >
       
      <Routes>
        <Route exact path='/' element={<NoRoom />} />
        <Route path='/:room' element={<Room socket={socket} getActiveRoom={getActiveRoom} usersInRoom={roomUsers()} roomMessages={roomMessages()} />} />
      </Routes>
    </div>
  )
}

export default Chat