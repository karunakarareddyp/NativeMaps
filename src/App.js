/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import Home from './components/Home';
import MyNavigation from './components/MyNavigation';

const AppNavigator = StackNavigator({
    Home: {screen: Home},
    Details: {screen: MyNavigation}
});

export default class App extends Component {
	render() {
		return (
			<AppNavigator />
		);
	}
}
