import React, { useState } from 'react'
import styles from './SideBar.module.scss'

const Sidebar = ({usersInRoom}) => {
  console.log(usersInRoom)
  
  return (
    <div className={styles.sidebar}>
        <h4 className={styles.sidebar_header}>Users in room:</h4>
        <ul className={styles.users}>
          {
            usersInRoom?.map((user,index)=> {
              console.log(user)
              let date = new Date(user.joinInRoom)
              let dateJoin = {
                day:date.getDate(),
                month: date.getMonth() < 9 ?  '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
                year: date.getFullYear(),
              }
              
              return (
                <li key={index} className={styles.users_li}>
                  <div className={styles.users_img}>
                    {user?.avatar ? <img src={user.avatar} alt="avatar" /> : <span className={styles.users_img_noAvatar}>{user.name}</span> }
                  </div>
                  <div className={styles.users_container}>
                    <p className={styles.users_name}>{user.name}</p>
                    <p className={styles.users_time}> Joined {dateJoin.day + '/' + dateJoin.month +  '/' + dateJoin.year}</p>
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