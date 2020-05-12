import React from 'react';
import Grid from '../single_grid/grid'
import styles from './main.module.css'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <Grid 
          cols={ 8 }
        />
        <h1 className={styles.blurb}>Make Music</h1>
        <footer className={styles.footer}>
          Copyright &copy; 2020 Harmony
        </footer>
      </div>
    );
  }
}

export default MainPage;
