import React from 'react'
import styles from './RoomList.module.scss'
import { Link } from 'react-router-dom'

const RoomList = ({room,activeRoom}) => {  
  let message = room.messages.at(-1) || {}
  let objDate = new Date(room.messages.at(-1)?.messageDate)
  let nowDate = new Date()
  let name = localStorage.getItem('name')

  message.messageTime = {
    year:objDate.getFullYear(),
    month:objDate.getMonth(),
    day:objDate.getDate(),
    hour:objDate.getHours(),
    min:objDate.getMinutes() >= 10 ? objDate.getMinutes() : '0' + objDate.getMinutes()
  }

  const showDate = (message) =>{
    if(message.messageTime.day == nowDate.getDate()) {
      return `${message.messageTime?.hour}:${message.messageTime?.min}`
    } else {
      return `${message.messageTime.day}/${message.messageTime.month < 9 ? '0'+ (message.messageTime.month + 1) : message.messageTime.month + 1}/${message.messageTime.year}`
    }

  }

  const checkMessage = (message,room) =>{
    if (message) {
      return (
        <div key={room.id} className={`${styles.room} ${activeRoom == room.id && styles.active}`}>
          <Link to={`/chat/${room.id}`}>
            <div className={styles.room_titleWrapper}>
              <h4 className={styles.room_name}>{room.id}</h4>
              <p className={styles.room_time}>{showDate(message)}</p>
            </div>

            <div className={styles.room_messageWrapper}>
              <p className={styles.room_sender}>{message.userName === name ? 'Вы:' : message.userName + ':'}</p>
              <p className={styles.room_lastMessage}>{message.message || <span>Сообщений пока нет...</span>}</p>
            </div>
          </Link>
        </div>
      )
    } else {

    }
  }
  
  return (
    checkMessage(message,room)
  );
}

export default RoomList