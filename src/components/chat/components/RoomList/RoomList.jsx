import React from 'react'
import styles from './RoomList.module.scss'
import { Link } from 'react-router-dom'

const RoomList = ({room}) => {
  return (
    <div key={room.id} className={styles.room}>
      <Link to={`/chat/${room.id}`}>
        <h5 className={styles.room_name}>{room.id}</h5>
        <p className={styles.room_lastMessage}>{room.messages.at(-1)}</p>
      </Link>
    </div>
  );
}

export default RoomList