import React, { useEffect, useState } from 'react'
import styles from './SideBar.module.scss'

const Sidebar = ({socket}) => {
  const [users,setUsers] = useState([])

  useEffect(()=>{
    socket.on('updateUsers',(data)=>{
      setUsers(data)
    })
  },[socket])

  return (
    <div className={styles.sidebar}>
        <h4 className={styles.sidebar_header}>Users:</h4>
        <ul className={styles.users}>
          {
            users.map((user,index)=> <li key={index} className={styles.users_li}>{user.user}</li>)
          }
        </ul>
    </div>
  )
}

export default Sidebar