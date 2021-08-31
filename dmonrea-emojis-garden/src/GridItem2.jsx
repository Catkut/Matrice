import React from 'react';
import './garden.css';

//export default function GridItem(props) {
const GridItem2 = (props) => {
    const row = props.garden2.map((plant, index) => 
        <button onClick={props.actionDelete} key={index} id={index}>
            {plant.value} 
        </button>
    )
    return (
        <div id="contenitore">
            {row}
        </div>
    )
}

export default GridItem2;