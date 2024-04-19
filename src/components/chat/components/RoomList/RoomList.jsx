import React from 'react'
import styles from './RoomList.module.scss'
import { Link } from 'react-router-dom'

const RoomList = ({room}) => {

  let message = room.messages.at(-1)
  let objDate = new Date(room.messages.at(-1)?.messageDate)
  let name = localStorage.getItem('name')
  room.messages.at(-1).messageTime = {
    year:objDate.getFullYear(),
    month:objDate.getMonth(),
    day:objDate.getDate(),
    hour:objDate.getHours(),
    min:objDate.getMinutes() >= 10 ? objDate.getMinutes() : '0' + objDate.getMinutes()
  }
  


  return (
    <div key={room.id} className={styles.room}>
      <Link to={`/chat/${room.id}`}>
        <div  className={styles.room_titleWrapper}>
          <h5 className={styles.room_name}>{room.id}</h5>
          <p className={styles.message_time}>{message.messageTime?.hour}:{message.messageTime?.min}</p>
        </div>

        <div className={styles.room_messageWrapper}>
          <p className={styles.room_sender}>{message.userName === name ? 'Вы:' : message.userName + ':'}</p>
          <p className={styles.room_lastMessage}>{message.message || <span>Сообщений пока нет...</span>}</p>
        </div>
      </Link>
    </div>
  );
}

export default RoomList