import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentLocation, fetchMarkersData} from './actions/mapsAction';
import scenes from "./routes/scenes";
import {Router} from "react-native-router-flux";

class App extends Component {
	componentWillMount() {
		this.props.getCurrentLocation();
		this.props.fetchMarkersData();
	}

	render() {
		return (<Router scenes={scenes}/>);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getCurrentLocation,
    fetchMarkersData
},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);