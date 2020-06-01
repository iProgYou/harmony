import React from 'react';
import styles from './main.module.css'
import { Link } from 'react-router-dom'

const PersonDisplay = ({image, name, title, links}) => {
  let allLinks = [];
  let logos = {
    linkedin: require('../../assets/linkedin_icon.png'),
    github: require('../../assets/github-icon.png'),
    angellist: require('../../assets/angelist.png')
  }
  for (let site in links){
  allLinks.push
  (<a 
    className={styles.link} 
    href={links[site]}>
    <img className={styles.siteLink} src = {logos[site]}/>
  </a>)
  }
  return (
    <div className= {styles.personDisplay}>
      <img className = {styles.personImage} src={image}/> 
      <h2 className = {styles.name}>{name}</h2>
      <h3 className = {styles.title}>{title}</h3>
      <ul>
      {allLinks.map((link) => <li>{link}</li>)}
      </ul>

    </div>
  )
}

export default PersonDisplay