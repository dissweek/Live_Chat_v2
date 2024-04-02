import React from "react";
import Sidebar from './SideBar/SideBar'
import ChatBody from './ChatBody/ChatBody'
import InputBlock from './InputBlock/InputBlock'
import styles from './Room.module.scss'
import { useParams } from "react-router-dom";

const Room = ({props,socket}) => {
  const {names} = useParams()
    const {messages,name,user,usersInRoom} = props
  console.log(names)
  return (
    <>
      <main className={styles.main}>
        <ChatBody messages={messages} name={name} />
        <InputBlock socket={socket} user={user} />
      </main>
      <Sidebar usersInRoom={usersInRoom} />
    </>
  );
};

export default Room;
