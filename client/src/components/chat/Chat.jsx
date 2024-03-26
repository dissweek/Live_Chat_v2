import React from 'react'
import Sidebar from './components/SideBar'
import ChatBody from './components/ChatBody'
import InputBlock from './components/InputBlock'

const Chat = ({socket}) => {
  return (
    <div className='chat'>
        <Sidebar />
        <main className='main'>
            <ChatBody />
            <InputBlock />
        </main>
    </div>
  )
}

export default Chat