import React, { useState } from 'react'
import styles from './SideBar.module.scss'

const Sidebar = ({usersInRoom}) => {
  
  return (
    <div className={styles.sidebar}>
        <h4 className={styles.sidebar_header}>Users:</h4>
        <ul className={styles.users}>
          {
            usersInRoom?.map((user,index)=> <li key={index} className={styles.users_li}>{user}</li>)
          }
        </ul>
    </div>
  )
}

export default Sidebar