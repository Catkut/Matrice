import React from 'react';
import ReactDOM from "react-dom";
import GridItem from './GridItem';
import Button from './Button.jsx';
import './garden.css';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gerden: []
            /*carre:[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]*/
        };
    };

    generateGarden = (size) => {
        let garden = [];
        for(let i = 0; i < size; i++) {
            garden.push(i)
        }
        return garden;
    };

    handleAdd = () => {
        this.setState({carre: this.state.carre + 1})
        }   


    render() {
        const size = 25;
        this.generateGarden(size);
        this.setState({garden: this.generateGarden(size)})
        return (
            <div id="conte">
                <h1>My Emoji Garden &#127793</h1>
                <GridItem carre={this.state.carre} />
                <Button handleAdd={this.handleAdd} />
            </div>
        );
    }
};


ReactDOM.render(<App/>, document.getElementById('root'))