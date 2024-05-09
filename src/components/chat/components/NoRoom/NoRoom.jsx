import React from 'react'
import styles from './NoRoom.module.scss'
import FAQ from '../../../../assets/FAQ.png'

const NoRoom = () => {
  return (
    <div  className={styles.main}>
      <div className={styles.main_container}>
        <div className={styles.header_container}>
          <h3 className={styles.header}><span>!!!</span> Select a room or create a new one <span>!!!</span></h3>
        </div>
        <div className={styles.help_container}>
          <div className={styles.help_img}>
            <img src={FAQ} alt="faq" />
          </div>
          <ul className={styles.help_ul}>

            <li className={styles.help_ul_li}>1. Window for creating/joining a room.</li>
            <li className={styles.help_ul_li}>2. List of rooms you are a member of.</li>
            <li className={styles.help_ul_li}>3. This button will connect you to a random room.</li>
            <li className={styles.help_ul_li}>4. Name of the room you are in.</li>
            <li className={styles.help_ul_li}>5. List of room participants.</li>
            <li className={styles.help_ul_li}>6. Go back to the main page.</li>
            <li className={styles.help_ul_li}>7. Leave the room.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NoRoom