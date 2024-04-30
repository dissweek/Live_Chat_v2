import React, { useEffect, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './ChatBody.module.scss'

const ChatBody = (props) => {
  const {messages,name,socket,room} = props
  const navigate = useNavigate();
  const chatRef = useRef(null)
  let prevSender = null

  useEffect(()=>{
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  },[chatRef,messages.length])

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
          <div className={styles.header_out}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
          </div>
          <h2 className={styles.header_name}>{messages[0]?.userRoom}</h2>
        <button onClick={handleLeave} className={styles.header_button}>
          Left Room
        </button>
      </header>

      <div className={styles.container} ref={chatRef}>
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
                  id={message.messageDate}
                  className={`
                    ${message.userName === name
                      ? styles.message_container
                      : styles.message_container + " " + styles.message_enemy} ${prevSender !== message.userName && styles.message_marginTop}`
                  }
                >
                  <div className={styles.message}>
                    {prevSender !== message.userName && changePrevSender(message)}
                    <div className={styles.message_wrapper}>
                      <p className={styles.message_time}>
                        {message.messageTime?.hour}:{message.messageTime?.min}
                      </p>
                      <p className={styles.message_block}>{message.message}</p>
                    </div>
                  </div>
                  {message.userName === messages[index+1]?.userName ?  
                    <div className={styles.message_margin}></div>
                    : <div className={styles.message_img}>
                      {message?.userAvatar ? <img src={message.userAvatar} alt="avatar" /> : <span className={styles.message_img_noAvatar}>{message.userName.split(0,1)}</span> }
                    </div>
                  }
                </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default ChatBody