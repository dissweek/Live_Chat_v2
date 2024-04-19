import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './ChatBody.module.scss'

const ChatBody = ({messages,name,socket,room}) => {
  const navigate = useNavigate();
  let prevSender = null

  const handleLeave = () => {
    socket.emit('leaveRoom',{name,room})
    navigate("/chat");
  };

  const changePrevSender = (a) =>{
    prevSender = a.userName
    return (<p className={styles.message_sender}>{a.userName}</p>)
  }

  messages.map((mes)=>{
    let objDate = new Date(mes.messageDate)
    mes.messageTime = {
      year:objDate.getFullYear(),
      month:objDate.getMonth(),
      day:objDate.getDate(),
      hour:objDate.getHours(),
      min:objDate.getMinutes() >= 10 ? objDate.getMinutes() : '0' + objDate.getMinutes()
    }
  })

  return (
    <>
      <header className={styles.header}>
        <button onClick={handleLeave} className={styles.header_button}>
          Left Room
        </button>
      </header>


        <div className={styles.container}>
          {messages.map((message, index) => {
            if (message.role === "admin" && message.message) {
              return (
                <div key={index} className={styles.messageAdmin}>
                  <div className={styles.messageAdmin_message}>
                    <p>
                      {message.message}
                      <span>{message.userName}</span>
                    </p>
                  </div>
                </div>
              );
            } else if (message.message) {
              return (
                <div
                  key={index}
                  className={
                    message.userName === name
                    ? styles.message_container
                    : styles.message_container + " " + styles.message_enemy
                  }
                >
                  <div className={styles.message}>
                    {prevSender !== message.userName && changePrevSender(message)}
                    <div className={styles.message_wrapper}>
                      <p className={styles.message_time}>{message.messageTime?.hour}:{message.messageTime?.min}</p>
                      <p className={styles.message_block}>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            }

          })}
        </div>
    </>
  );
}

export default ChatBody