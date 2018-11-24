import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import Home from "../components/Home";

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="navigation" component={Home} title="Navigation" initial/>
    </Scene>
);

export default scenes;
