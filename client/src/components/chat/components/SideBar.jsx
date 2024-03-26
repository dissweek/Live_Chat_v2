import React from 'react'
import styles from './SideBar.module.scss'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <h4 className='sidebar_header'>Users</h4>
        <ul className='users'>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
        </ul>
    </div>
  )
}

export default Sidebar