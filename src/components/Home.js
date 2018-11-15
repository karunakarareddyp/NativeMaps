import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Home extends Component {
	static navigationOptions = {
		title: 'Home Page'
	};
	constructor(props) {
		super(props);
	}

	render(){
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.layout}>
				<Text>Click below link to launch Employee Navigation system</Text>
				<Text style={[styles.text, styles.selectedText]} onPress={() => navigate("Details")}>Launch Map</Text>
			</View>
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

export default Home;
