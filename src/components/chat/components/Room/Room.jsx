import React,{useState,useEffect} from "react";
import Sidebar from './SideBar/SideBar'
import ChatBody from './ChatBody/ChatBody'
import InputBlock from './InputBlock/InputBlock'
import styles from './Room.module.scss'
import { useParams } from "react-router-dom";

const Room = ({socket,getActiveRoom,roomMessages,usersInRoom}) => {

  // console.log('roomMessages:',roomMessages)
  const name = localStorage.getItem('name')
  const {room} = useParams()
  const [user,setUser] = useState({name,role:'user'})

  useEffect(()=>{
    getActiveRoom(room)
  },[room])


// searchParams
  useEffect(()=>{
    setUser({name,room})
  },[room])

  return (
    <>
      <main className={styles.main}>
        <ChatBody messages={roomMessages} getActiveRoom={getActiveRoom} name={name} socket={socket} room={room} />
        <InputBlock socket={socket} user={user} />
      </main>
      <Sidebar usersInRoom={usersInRoom} />
    </>
  );
};

export default Room;
