import React from 'react';
import ReactDOM from 'react-dom';
import GridGarden from './GridGarden.jsx';
import './garden.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { farm: [] }
        this.size= 25
    };

    // rinvia una tabella di 25 elementi
    generateGarden = (size) => {
        let tab = [];
        for(let i = 0; i < size; i++) {
            tab.push({id: i, value: ''})
        }
        return tab;

    };
    // FUNCTION que joute un tableau dans le state farm
    addGarden = (size) => {
        let newFarm = [...this.state.farm] //JE COPIE LE STATE
        newFarm.push(this.generateGarden(size)) // JE PUSH SUR GENERATE
        this.setState({farm: newFarm}) // ON MET A JOUR LE STATE
    }
   
     // Ce qu'il se passe au 1er montage de mon composant
    componentDidMount() {
        const size = 25;
        this.setState({ garden: this.generateGarden(size)});
        this.addGarden(this.size)
    };

    componentDidUpdate() {
        console.log("update farm :", this.state.farm)
    }

    render() {
        return (
            <>
                <h2>My Emoji Garden</h2>
                <div className="farm">
                    {this.state.farm.map((elem, index) => {
                        return ( <GridGarden key={index} garden={elem} /> );
                    })}
                </div>
                <div className="button-action">
                    <button onClick={() => this.addGarden(this.size)}>Add Garden </button>
                </div>
            </>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById('root'))