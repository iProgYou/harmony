import React from 'react';
import styles from './grid.module.css';

const GridItem = ({ note, selected, handleClick, handleSelect, isLoaded }) => {
    const buttonClasses = [styles.gridItem,styles[note]]
    if (selected) {
        buttonClasses.push(styles.selected)
    }

    return (<div onClick ={()=>handleSelect()}>
        <button
            className={buttonClasses.join(' ')}
            disabled={!isLoaded}
            // onClick={() => handleClick(note)}
        ></button>
    </div>)
}

export default GridItem;