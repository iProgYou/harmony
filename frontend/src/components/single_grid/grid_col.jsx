import React from 'react';
import GridItem from './grid_item'
import styles from './grid.module.css';

class GridColumn extends React.Component{
  constructor(props){
    super(props);
    this.state = { selected: props.noteNames.indexOf(props.selected) } 
    
  }
  handleSelect(note, idx){
    if (this.state.selected === idx){
      this.setState({ selected: -1 })
      this.props.handleUpdate(-1)
    } else {
      this.setState({ selected: idx })
      this.props.handleClick(note)
      this.props.handleUpdate(idx)
    }
  }
  

  render() {
    const selected = this.state.selected;
    const colStyles = (this.props.idx === 0 || this.props.idx % 8 !== 0) ? styles.gridCol : [styles.gridCol, styles.eighth].join(" ")
    return (<div id = {this.props.idx} className={colStyles}>
      {this.props.noteNames.map((note, idx) => (
        <GridItem
          key={idx}
          selected = {selected === idx}
          handleSelect={()=>this.handleSelect(note, idx)}
          note={note}
          isLoaded={this.props.isLoaded}
          // updateLast = {this.props.updateLast}
        />
          ))}
          </div>
      
    )
    
  }
}

export default GridColumn;