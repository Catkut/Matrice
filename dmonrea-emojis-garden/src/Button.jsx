import React from 'react';
import './garden.css';

const Button = (props) => {
    return (
        <button onClick={props.actionAdd} id="plantEmoji">Plant a Emoji</button>
    )
}

export default Button;
