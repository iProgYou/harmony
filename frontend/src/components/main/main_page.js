import React from 'react';
import Grid from '../single_grid/grid'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <Grid 
          cols={ 8 }
        />
        <h1>Harmony-Music</h1>
        <footer>
          Copyright &copy; 2020 Harmony-Music
        </footer>
      </div>
    );
  }
}

export default MainPage;
