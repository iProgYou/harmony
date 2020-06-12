import React from 'react'
import styles from './welcome.module.css'
import { FaHandPointDown } from 'react-icons/fa';

const Welcome = ({closeModal}) => {

  return (
    <div className={styles.modalBg} onClick={closeModal}>
      <div className={styles.modalChild} onClick={e => e.stopPropagation()}>
        <h1>Welcome to Harmony</h1>
        <p>What is Harmony you ask? Harmony is a collaborative real-time music making application allowing a group of friends to create tunes together over the interweb</p>
        <p>Please see the video below for a demonstration </p>
        < FaHandPointDown size={30} />
        <video controls className={styles.videoPlayer}>
          <source src={require("../../../assets/HarmonyDem.mp4")}/>
        </video>
      </div>
    </div>

  )
}



export default Welcome