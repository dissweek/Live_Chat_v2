import React, { useEffect, useState } from 'react'
import Room from './components/Room/Room'
import styles from './Chat.module.scss'

import { Route, Routes, useLocation } from 'react-router-dom'
import RoomList from './components/RoomList/RoomList'
import NoRoom from './components/NoRoom/NoRoom'



const Chat = ({name}) => {
  console.log(name)

  const { search } = useLocation();
  const [room, setRoom] = useState('');
  const [messages,setMessages] = useState([])
  const [usersInRoom,setUsersInRoom] = useState([])
  const [user,setUser] = useState({name:'',role:'user'})

// searchParams
  useEffect(()=>{
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    setRoom(searchParams.room)
    // setName(searchParams.name)
    searchParams.role = 'user'

    setUser({name:name,room:room})
    socket.emit('join',{...searchParams,})
  },[search])

// post
  useEffect(()=>{
    socket.on('post',(data)=>{
      setMessages([...messages,data])
    })
  },[messages])


// message:system
  useEffect(()=>{
    socket.on('message:system',(data)=>{
      setUsersInRoom(data.usersInRoom)
      setMessages([...messages,data])
    })
  },[messages,usersInRoom])


  return (
    <div className={styles.chat}>
      <RoomList />
  
      <Routes>
        <Route exact path='/' element={<NoRoom/>} />
        <Route path='/room/:roomId' element={<Room  socket={socket} props={{messages,name,user,usersInRoom}}/>} />
      </Routes>
      {/* <Room socket={socket} props={{messages,name,user,usersInRoom}}  /> */}
    </div>
  )
}

export default Chat