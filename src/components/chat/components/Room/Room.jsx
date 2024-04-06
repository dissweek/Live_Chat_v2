import React,{useState,useEffect} from "react";
import Sidebar from './SideBar/SideBar'
import ChatBody from './ChatBody/ChatBody'
import InputBlock from './InputBlock/InputBlock'
import styles from './Room.module.scss'
import { useParams,useLocation } from "react-router-dom";

const Room = ({socket,getActiveRoom,roomMessages}) => {

  console.log('roomMessages:',roomMessages)
  const {room} = useParams()
  const name = localStorage.getItem('name')
  const [messages,setMessages] = useState([])

  const [user,setUser] = useState({name:'',role:'user'})

  useEffect(()=>{
    getActiveRoom(room)
  },[room])


// searchParams
  useEffect(()=>{
    setUser({name,room})
    socket.emit('join',{name,room,role:'user'})
  },[socket,room])

// post
  // useEffect(()=>{
  //   socket.on('post',(data)=>{
  //     setMessages([...messages,data])
  //   })
  // },[messages])




  return (
    <>
      <main className={styles.main}>
        <ChatBody messages={roomMessages} name={name} />
        <InputBlock socket={socket} user={user} />
      </main>
      <Sidebar usersInRoom={usersInRoom} />
    </>
  );
};

export default Room;
