import React from 'react'
import styles from './navbar.module.css'

export default class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {search:''}
  }

  handleSearch(e){
    e.preventDefault()
    console.log(`you just did a search for ${this.state.search}`)
  }
  handleChange(e){
    this.setState({search: e.currentTarget.value})
  }

  render(){
    return(
      <form onSubmit={(e) => this.handleSearch(e)} id={styles.searchbar}>
        <button type="submit">
          <img
            id="search-icon"
            src="https://meat-project-seed.s3-us-west-1.amazonaws.com/icon-search-white.png"
            alt=""
          />
        </button>
        <div id="neg" />
        <input
          type="text"
          value={this.state.search}
          onChange={(e) => this.handleChange(e)}
          placeholder="Search"
        />
      </form>
    )
  }
}