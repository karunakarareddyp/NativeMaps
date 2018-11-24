import React, {Component} from 'react';
import { connect } from 'react-redux';
import scenes from "./routes/scenes";
import {Router} from "react-native-router-flux";

class App extends Component {
	render() {
		return (<Router scenes={scenes}/>);
	}
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);