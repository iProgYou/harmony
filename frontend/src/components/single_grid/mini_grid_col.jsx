import React from 'react';
import MiniGridItem from './mini_grid_item'
import styles from './grid.module.css';

export default class MiniGridColumn extends React.Component{
  constructor(props){
    super(props);
    this.state = { selected: props.noteNames.indexOf(props.selected) } 
    
  }


  render() {
    const selected = this.state.selected;
    return (<div id = {this.props.idx} className={styles.gridCol}>
      {this.props.noteNames.map((note, idx) => (
        <MiniGridItem
          key={idx}
          selected = {selected === idx}
          note={note}
          isLoaded={this.props.isLoaded}
        />
          ))}
          </div>
      
    )
    
  }
}
