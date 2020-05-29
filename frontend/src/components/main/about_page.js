import React from 'react';
import styles from './main.module.css'
import PersonDisplay from './person_display'

const AboutPage = () => {
  const theBoys = [
    { name: 'Will Sexton', image:'https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/808/medium/Will_Sexton_1.JPG?1583210215', title: 'Frontend Engineer, Lead of Visual design', links: {github: 'https://github.com/williamsexton/', linkedin: 'https://www.linkedin.com/in/will-sexton-588b961a9/', angellist: 'https://angel.co/u/william-sexton-1'}}, 
    { name: 'Charles', image: 'https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/726/medium/Charles_Combs-Esmail_3.JPG?1583204545', title: 'Head of Lorem Ipsum', links:{github: 'fill this out yall', linkedin: 'fill this one out too', angellist: 'this also'}},
    { name: 'Zack', image: 'https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/752/medium/Zachary_Barbieri_1.JPG?1583210462', title: 'Head of Lorem Ipsum', links:{github: 'fill this out yall', linkedin: 'fill this one out too', angellist: 'this also'}},
    { name: 'Isaac', image: 'https://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/004/712/medium/Issac_Yoon_4.JPG?1583207228', title: 'Head of Lorem Ipsum', links:{github: 'fill this out yall', linkedin: 'fill this one out too', angellist: 'this also'}}
  ]
  return(
    <div className = {styles.theBoys}>
     { theBoys.map( (dude) => <PersonDisplay {...dude}/>)}
    </div>
  )

}

export default AboutPage