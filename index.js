/** @format */

import {AppRegistry} from 'react-native';
import {Router} from 'react-native-router-flux';
import App from './src/App';
import {name as appName} from './app.json';
import getStore from "./src/store";
import Provider from "react-redux/es/components/Provider";
import React from "react";

const RootApp = () => (
    <Provider store={getStore()}>
        <App />
    </Provider>
);
AppRegistry.registerComponent(appName, () => RootApp);
