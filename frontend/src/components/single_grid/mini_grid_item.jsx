import React from 'react';
import styles from './grid.module.css';

const MiniGridItem = ({ note, selected, handleClick, handleSelect, isLoaded }) => {
    const buttonClasses = [styles.gridItem,styles[note]]
    if (selected) {
        buttonClasses.push(styles.selected)
    }

    return (<div onClick ={handleClick}>
        <button
            className={buttonClasses.join(' ')}
            disabled={!isLoaded}
            // onClick = {updateLast}
            // onClick={() => handleClick(note)}
        ></button>
    </div>)
}

export default MiniGridItem;