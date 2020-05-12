import React from 'react';
import GridItem from './grid_item'
import styles from './grid.module.css';

class GridColumn extends React.Component{
  constructor(props){
    super(props);
    this.state = { selected: [] };
  }
  handleSelect(note){
    if (this.state.selected.includes(note)){
        let temp = this.state.selected.filter(ele => note !== ele);
        this.setState({ selected: temp })
        this.props.handleUpdate(this.state.selected)
    } else {
        let selected = this.state.selected;
        selected.push(note)
        this.setState({ selected })
        this.props.handleClick(note)
        this.props.handleUpdate(this.state.selected)
    }
  }
  

  render() {
    const selected = this.state.selected;
    return (<div className={styles.gridCol}>
      {this.props.noteNames.map((note, idx) => (
        <GridItem
          key={idx}
          selected = {selected.includes(note)}
          handleSelect={()=>this.handleSelect(note, idx)}
          note={note}
          isLoaded={this.props.isLoaded}
          updateLast = {this.props.updateLast}
        />
          ))}
          </div>
      
    )
    
  }
}

export default GridColumn;