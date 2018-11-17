import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {getName, getNavData} from './actions/gpsAction';
import scenes from "./routes/scenes";
import {Router} from "react-native-router-flux";

class App extends Component {
	componentWillMount() {
		this.props.getName();
		this.props.getNavData();
	}

	render() {
		return (<Router scenes={scenes}/>);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getName,
	getNavData
},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);