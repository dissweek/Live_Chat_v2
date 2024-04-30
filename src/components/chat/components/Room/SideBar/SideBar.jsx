import React, { useState } from 'react'
import styles from './SideBar.module.scss'

const Sidebar = ({usersInRoom}) => {
  
  return (
    <div className={styles.sidebar}>
        <h4 className={styles.sidebar_header}>Users in room:</h4>
        <ul className={styles.users}>
          {
            usersInRoom?.map((user,index)=> {
              return (
                <li key={index} className={styles.users_li}>
                  <div className={styles.users_img}>
                    {user?.avatar ? <img src={user.avatar} alt="avatar" /> : <span className={styles.users_img_noAvatar}>{user.split(0,1)}</span> }
                  </div>
                  <div className={styles.users_container}>
                    <p className={styles.users_name}>{user}</p>
                    <p className={styles.users_time}> В комнате с {user?.dateJoin}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
    </div>
  )
}

export default Sidebar