import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smurfs: [],
        };
    }

    // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
    // Notice what your map function is looping over and returning inside of Smurfs.
    // You'll need to make sure you have the right properties on state and pass them down to props.

    componentDidMount() {
        axios
            .get('http://localhost:3333/smurfs')
            .then(response => this.setState({ smurfs: response.data }))
            .catch(err => console.log(err));
    }

    addSmurf = newSmurf => {
        // add code to create the smurf using the api
        axios
            .post('http://localhost:3333/smurfs', newSmurf)
            .then(response => { this.setState({ smurfs: response.data }) })
            .catch(err => console.log(err));
    }

    deleteSmurf = id => {
        console.log('App.js delete smurf', id);
        axios
            .delete(`http://localhost:3333/smurfs/${id}`)
            .then(response => this.setState({ smurfs: response.data }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="App">
                <NavLink to="/">View Smurfs</NavLink>
                <NavLink to="/smurf-form">Add Smurf</NavLink>
                <Route
                    exact
                    path="/"
                    render={() => <Smurfs
                        smurfs={this.state.smurfs}
                        deleteSmurf={this.deleteSmurf}
                    />}
                />
                <Route
                    path="/smurf-form"
                    render={() => <SmurfForm addSmurf={this.addSmurf} />}
                />
            </div>
        );
    }
}

export default App;
