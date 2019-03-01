import React, { Component } from 'react';
import { Route, NavLink, withRouter } from "react-router-dom";
import axios from 'axios';
import Navigation from './components/Navigation';
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
    // console.log("App.js componentDidMount()");
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => { this.setState({ smurfs: response.data }); })
      .catch(err => console.log(err));
  }

  addSmurf = () => {
    axios
      .post("http://localhost:3333/smurfs", this.state.smurfs)
      .then(res => {
        this.setState({
          friends: res.data,
          friend: {
            name: "",
            age: "",
            email: "",
            imgUrl: ""
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <Navigation />
          <NavLink className="navlink" to="/smurfs">Smurf Village</NavLink>
          <NavLink className="navlink" to="/smurf-form">Add a Smurf</NavLink>
        </nav>

        <Route path="/smurf-form" render={props => <SmurfForm {...props} addSmurf={this.addSmurf} />} />
        <Route exact path="/smurfs" render={() => <Smurfs smurfs={this.state.smurfs} />} />
      </div>
    );
  }
}

export default App;
