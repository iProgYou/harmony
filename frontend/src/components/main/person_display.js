import React from 'react';
import styles from './main.module.css'
import { Link } from 'react-router-dom'

const PersonDisplay = ({image, name, title, links}) => {
  let allLinks =[];
  for (let site in links){
  allLinks.push(<a href={links[site]}>{site}</a>)
  }
  return (
    <div className= {styles.personDisplay}>
      <img src={image}/> 
      <h2>{name}</h2>
      <h3>{title}</h3>
      <ul>
      {allLinks.map((link) => <li>{link}</li>)}
      </ul>

    </div>
  )
}

export default PersonDisplay