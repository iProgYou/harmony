import React from 'react';

const GridItem = ({ note, selected, handleClick, handleSelect, isLoaded }) => (

<div onClick ={()=>handleSelect()}>
    <button
            className={(selected) ? `gridItem ${note} selected` : `gridItem ${note}`}
    disabled={!isLoaded}
    // onClick={() => handleClick(note)}
    ></button>
</div>
)

export default GridItem;