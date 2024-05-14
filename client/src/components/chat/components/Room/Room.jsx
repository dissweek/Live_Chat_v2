import React,{useState,useEffect} from "react";
import Sidebar from './SideBar/SideBar'
import ChatBody from './ChatBody/ChatBody'
import InputBlock from './InputBlock/InputBlock'
import styles from './Room.module.scss'
import { useParams } from "react-router-dom";

const Room = ({socket,getActiveRoom,roomMessages,usersInRoom}) => {

  const name = localStorage.getItem('name')
  const {room} = useParams()
  const [user,setUser] = useState({name,role:'user'})
  const [showUsers,setShowUsers] = useState(false)

  useEffect(()=>{
    getActiveRoom(room)
  },[room])

  const forMobileShowUsers = (a) =>{
    setShowUsers(a)
  }


// searchParams
  useEffect(()=>{
    setUser({name,room})
  },[room])

  return (
    <>
      <main className={styles.main}>
        <ChatBody messages={roomMessages} setShowUsers={forMobileShowUsers} getActiveRoom={getActiveRoom} name={name} socket={socket} room={room} />
        <InputBlock socket={socket} user={user} />
      </main>
      <Sidebar usersInRoom={usersInRoom} setShowUsers={forMobileShowUsers} showUsers={showUsers} />
    </>
  );
};

export default Room;
