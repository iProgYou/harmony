import React from 'react';
import styles from './grid.module.css';

const MiniGridItem = ({ note, selected }) => {
    const buttonClasses = [styles.gridItem,styles[note]]
    if (selected) {
        buttonClasses.push(styles.selected)
    }

    return (<div>
        <button
            className={buttonClasses.join(' ')}
            // onClick = {updateLast}
            // onClick={() => handleClick(note)}
        ></button>
    </div>)
}

export default MiniGridItem;