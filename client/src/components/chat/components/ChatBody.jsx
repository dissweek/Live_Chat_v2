import React from 'react'
import styles from './ChatBody.module.scss'

const ChatBody = () => {
  return (
    <>
        <header>
            <button>Left Room</button>
        </header>

        <div className={styles.container}>

            <div className="message">
                <p className='message_sender'>Вы</p>
                <div className="message">
                    <p>Hello</p>
                </div>
            </div>
            <div className="message">
                <p className='message_sender enemy'>Вы</p>
                <div className="message">
                    <p>Hello</p>
                </div>
            </div>

        </div>
    </>
  )
}

export default ChatBody