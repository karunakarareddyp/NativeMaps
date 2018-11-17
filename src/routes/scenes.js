import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import Home from "../components/Home";
import MyNavigation from "../components/MyNavigation";

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="home" component={Home} title="Home" initial />
        <Scene key="navigation" component={MyNavigation} title="Navigation" />
    </Scene>
);

export default scenes;
