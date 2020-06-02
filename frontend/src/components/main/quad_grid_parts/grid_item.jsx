import React from 'react';
import styles from './grid.module.css';

const GridItem = ({ note, selected, handleClick, handleSelect, isLoaded, updateLast }) => {
    const buttonClasses = [styles.gridItem,styles[note]]
    if (selected) {
        buttonClasses.push(styles.selected)
    }

    function handleClick() {
        handleSelect()
        // updateLast()
    }
    return (<div onClick ={handleClick}>
        <button
            className={buttonClasses.join(' ')}
            disabled={!isLoaded}
            onClick = {updateLast}
            // onClick={() => handleClick(note)}
        ></button>
    </div>)
}

export default GridItem;