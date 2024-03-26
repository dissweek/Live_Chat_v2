import React from 'react'
import styles from './SideBar.module.scss'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <h4 className={styles.sidebar_header}>Users:</h4>
        <ul className={styles.users}>
            <li className={styles.users_li}>User 1</li>
            <li className={styles.users_li}>User 2</li>
            <li className={styles.users_li}>User 3</li>
        </ul>
    </div>
  )
}

export default Sidebar