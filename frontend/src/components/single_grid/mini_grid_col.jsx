import React from 'react';
import MiniGridItem from './mini_grid_item'
import styles from './grid.module.css';

export default class MiniGridColumn extends React.Component{
  constructor(props){
    super(props);
    // this.state = { selected: props.noteNames.indexOf(props.selected) } 
    
  }


  render() {
    const selected = this.props.selected;
    const blocks = this.props.noteNames.map((note, idx) => (
      <MiniGridItem
        key={idx}
        selected={(selected instanceof Array) ? selected.includes(note) : selected === note}
        note={note}
      />
    ))

    
    return (<div id = {this.props.idx} className={styles.gridCol}>
      {blocks}
          </div>
      
    )
    
  }
}
