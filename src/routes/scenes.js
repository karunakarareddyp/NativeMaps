import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import Home from "../components/Home";
import MapContainer from "../components/MapContainer";

const scenes = Actions.create(
    <Scene key="root">
        {/*<Scene key="home" component={Home} title="Home" initial />*/}
        <Scene key="navigation" component={MapContainer} title="Navigation" initial/>
    </Scene>
);

export default scenes;
