import React from 'react'
import Sidebar from './components/SideBar'
import ChatBody from './components/ChatBody'
import InputBlock from './components/InputBlock'
import styles from './Chat.module.scss'

const Chat = ({socket}) => {
  return (
    <div className={styles.chat}>
        <Sidebar socket={socket} />
        <main className='main'>
            <ChatBody socket={socket} />
            <InputBlock socket={socket} />
        </main>
    </div>
  )
}

export default Chat