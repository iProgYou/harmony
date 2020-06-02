import React from 'react';
import styles from './main.module.css'
import PersonDisplay from './person_display'

const AboutPage = () => {
  const theBoys = [
    { name: 'Will Sexton', image:'https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/808/medium/Will_Sexton_1.JPG?1583210215', title: 'Lead of Visual design, Frontend Engineer', links: {github: 'https://github.com/williamsexton/', linkedin: 'https://www.linkedin.com/in/will-sexton-588b961a9/', angellist: 'https://angel.co/u/william-sexton-1'}}, 
    { name: 'Charles Coombs Esmail', image: 'https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/726/medium/Charles_Combs-Esmail_3.JPG?1583204545', title: 'Fullstack Engineer', links: { github: 'https://github.com/ccoombsesmail', linkedin: 'https://www.linkedin.com/in/charles-coombs-esmail-1b5a20113/', angellist: 'https://angel.co/u/charlie-coombs'}},
    { name: 'Zack Barbieri', image: 'https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/752/medium/Zachary_Barbieri_1.JPG?1583210462', title: 'Project Lead', links: { github: 'https://github.com/iProgYou/', linkedin: 'https://www.linkedin.com/in/zack-barbieri-040277198/', angellist: 'https://angel.co/u/zack-barbieri'}},
    { name: 'Isaac Yoon', image: 'https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/712/medium/Issac_Yoon_4.JPG?1583207228', title: 'Lead Backend Engineer', links: { github: 'https://github.com/isaac-yoon', linkedin: 'https://www.linkedin.com/in/lucidlaughter/', angellist: 'https://angel.co/u/isaac-yoon-22'}}
  ]
  return(
    <div className = {styles.aboutOuter}> 
    <h1> The Team </h1>
    <div className = {styles.theBoys}>
     { theBoys.map( (dude) => <PersonDisplay {...dude}/>)}
    </div>
    </div>
  )

}

export default AboutPage