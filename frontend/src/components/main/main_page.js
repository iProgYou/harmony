import React from 'react';
import Grid from '../single_grid/grid'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <Grid />
        <h1>Harmony</h1>
        <footer>
          Copyright &copy; 2020 Harmony
        </footer>
      </div>
    );
  }
}

export default MainPage;
