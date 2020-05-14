import React from 'react'
import styles from './room.module.css'
import Radio from '@material-ui/core/Radio';

export default class InstrumentSelect extends React.Component{

  constructor(props){
    super(props)
    this.state = {selected: null, complete:false}
  }

  handleChange(e){
    if(this.state.selected !== e.target.value){
      this.setState({selected:e.target.value})
    }else{
      this.setState({selected:null})
    }
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(`selected ${this.state.selected}`)
    this.props.selectInstrument(this.state.selected)
    this.setState({complete:true})
  }

  render(){
    const buttons = this.props.instruments.map( (instrument) => (
    <label>
    <Radio
        checked={this.state.selected=== instrument}
        onChange={(e) => this.handleChange(e)}
        value={instrument}
        name="instrument-select"
        />{instrument}
      </label>
    ))
    return(
      <div className={(this.state.complete) ? [styles.outerModal,styles.hidden].join(" ") : styles.outerModal}>
        <form
        className={styles.innerModal}
        onSubmit={(e) => this.handleSubmit(e)}
        >
          <h1 className={styles.selectTitle}>Select an Instrument</h1>
          <div className={styles.buttons}>
            {buttons}
          </div>
         <button disabled={this.state.selected === null} >Start Jammin'</button>
        </form>
      </div>
    );
  }
}