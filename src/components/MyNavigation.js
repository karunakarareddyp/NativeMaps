import React, {Component} from 'react';
import autobind from 'react-autobind';
import {View, StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

/*const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]*/

class MyNavigation extends Component {
	constructor(props) {
		super(props);
        autobind(this);
		this.state = {
		    region: this.getInitialState().region,
            markers: [
                {
                    coordinate: {
                        latitude: 15.651805,
                        longitude: 77.208946,
                    },
                    title: "Best Place",
                    description: "This is the best place in Portland",
                    //image: Images[0],
                },
                {
                    coordinate: {
                        latitude: 15.728392,
                        longitude: 75.637077,
                    },
                    title: "Second Best Place",
                    description: "This is the second best place in Portland",
                    //image: Images[1],
                },
                {
                    coordinate: {
                        latitude: 15.852792,
                        longitude: 74.498703,
                    },
                    title: "Third Best Place",
                    description: "This is the third best place in Portland",
                    //image: Images[2],
                },
                {
                    coordinate: {
                        latitude: 14.623801,
                        longitude: 75.621788,
                    },
                    title: "Fourth Best Place",
                    description: "This is the fourth best place in Portland",
                    //image: Images[3],
                },
            ],
        }
	}

    getInitialState() {
        return {
            region: {
                latitude: 14.31728,
                longitude: 75.81389,
                latitudeDelta: 9.92864195044303443,
                longitudeDelta: 0.390142817690068,
            },
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }
	render () {
		return (
			<View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                >
                    {
                        this.state.markers.map(marker => (
                            <Marker
                                key={marker.coordinate.latitude}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))
                    }
                </MapView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: { ... StyleSheet.absoluteFillObject },
	map: { ...StyleSheet.absoluteFillObject }
});

MyNavigation.navigationOptions = {
	title: "Employee Navigation system"
};
export default MyNavigation;
