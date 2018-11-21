import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text} from 'react-native';
import {Container} from 'native-base'
import { Actions } from 'react-native-router-flux';

class Home extends Component {
	static navigationOptions = {
		title: 'Home Page'
	};
	constructor(props) {
		super(props);
	}

	render(){
		const { myName } = this.props;
		return(
			<Container style={styles.layout}>
				<Text>Click below link to launch Employee Navigation system - {myName}</Text>
				<Text style={[styles.text, styles.selectedText]} onPress={() => Actions.navigation()}>Launch Map</Text>
			</Container>
		);
	}
}

let styles = StyleSheet.compose({
	layout: {
		flex: 1,
		//marginTop: 50,
		//padding: 10,
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center'
	},
	text: {
		//flex: 1,
		fontWeight: 'bold',
		margin: 2,
		padding: 5,
		borderWidth: StyleSheet.hairlineWidth,
		backgroundColor: 'grey',
		textAlign: 'center',
		borderRadius: 5
	},
	selectedText: {
		backgroundColor: 'ivory'
	},

});

const mapStateToProps = (state) => ({
    myName: state.main.myName
});
export default connect(mapStateToProps) (Home);
