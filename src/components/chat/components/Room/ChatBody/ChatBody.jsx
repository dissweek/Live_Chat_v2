import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './ChatBody.module.scss'

const ChatBody = ({messages,name}) => {
  const navigate = useNavigate();
  const handleLeave = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

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
                <p className={styles.message_sender}>{message.userName}</p>
                <div className={styles.message}>
                  <p>{message.message}</p>
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