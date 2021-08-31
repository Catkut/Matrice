import React from 'react';
import './garden.css';

class GridGarden extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            garden: props.garden,
            value: ['🌱','🌿','🌲']
        } 
    }

    componentDidMount() {
        //console.log("mount garden with emojis:", this.state.value);
    }

    componentDidUpdate() {
        console.log("update garden:: nb emojis: ", this.getNumberOfEmojis());
    }

    //fonction que renvoie juste le nombre de cases occupe
    getNumberOfEmojis = () => {
        let getNumberOfEmojis = this.state.garden.filter((element) =>
            element.value !== ""
            );
        return getNumberOfEmojis.length;
    };

      // Pour suivre les mises à jours des states en synchrone
  //(et si nécessaire déclencher des actions)

/*    componentDidUptade() {
        console.log("garden.length:", this.state.garden.length);
        console.log("garden: ", this.state.garden)
        console.log("count: ", this.state.count);
    }*/

    // TODO: on rajoute la condition sur garden.length pour évacuer les cas > 25
    
       /* if (true) {
            this.growGarden();
            // on clone garden et on va modifier la valeur de newGarden pour l'index égal à count.
            let newGarden = [...this.state.garden]; // ⚠️ syntaxe pour récupérer les références et non juste les valeurs
            newGarden.find((x) => x.value === "").value = "🌱"; // pour gérer le cas ou c'est delete
            // 3. on met à jour le state
            this.setState({ garden: newGarden });
        }*/
/*
           if ( this.state.count < 25 ) {
            this.setState({ count: this.state.count + 1});*/

    handleAdd = () => {
        let newGarden = [...this.state.garden];
        const gardenFiltre =newGarden.filter(banane => banane.value === "")
        const gardenRand = Math.floor(Math.random() * gardenFiltre.length) + 0;
        if (gardenFiltre.length !== 0){
            gardenFiltre[gardenRand].value = "🌱" // this.state.value[0]
            this.growGarden(gardenFiltre[gardenRand].id)
            this.setState({ garden: newGarden});
        }

    };

    growGarden = (id) => {
        let newGarden = [...this.state.garden];
        setTimeout(() => {
            if (newGarden[id].value === this.state.value[0]) {
                newGarden[id].value = this.state.value[1]
                this.setState({ garden: newGarden })
            }
        }, 2000);
        setTimeout(() => {
            if (newGarden[id].value === this.state.value[1]) {
                newGarden[id].value = this.state.value[2]
                this.setState({ garden: newGarden })
            }
        }, 4000);
    };

        /*console.log("AAAAAAAAAAAAAAAAAAAAA", this.state.garden.length)
        newGarden.map((plant) => {
            if (this.state.garden.length > 0) {
                console.log("maggiore di 0", this.state.garden.length)
                setTimeout(() => {this.growGarden()}, 1000)
                    if (plant.value === "🌱"){ 
                        // ici on appelle setTimeout en boucle dès que growGarden 
                        //a été executé (c'est un trick pour la répéter toutes les 2sec)
                        setTimeout(() => {this.growGarden()}, 1000)
                        return (plant.value = "🌿")
                        console.log("1")
                    }
                    else if (plant.value === "🌿") {
                        setTimeout(() => {this.growGarden()}, 1000)
                        return (plant.value = "🌲")
                        console.log("2")
                    } 
                    else { 
                        return (plant.value)
                        console.log("3")
                    }
            } this.setState({ garden: newGarden })
            
        })*/

    // libérer une case au clic
    handleRemove = (id) => {
        const newGarden = [...this.state.garden];
        newGarden[id.currentTarget.id].value = "";
        this.setState({ garden: newGarden });
    
    };

    /*if ( this.state.count > 0 ) {
        console.log("yyeyeyeyyeyeye: ", id.currentTarget);
        this.setState({ count: this.state.count - 1});
        let newGarden2 = this.state.garden;
        newGarden2[id.currentTarget.id].value = null;
    //  this.setState({garden: newGarden});
    }*/

    render() {
        return (
            <div className="garden">
                <div className="garden-grid">
                    {this.state.garden.map((plant, index) => {
                        return (
                            <button className="garden-cell" onClick={this.handleRemove} key={index} id={index}>
                            {plant.value}</button>
                        );
                    })}
                </div>
                <div className="button-action">
                    <button  onClick={this.handleAdd}>Plant a Emoji</button>
                </div>
           </div>
        )
    }
}

export default GridGarden;