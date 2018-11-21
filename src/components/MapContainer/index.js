import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'react-autobind';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {bindActionCreators} from "redux";
import SearchBox from '../SearchBox';
import {fetchSearchFilterData} from '../../actions/mapsAction';

let filterTimeout;

class MyNavigation extends Component {
	constructor(props) {
		super(props);
        autobind(this);
		this.state = {
		    region: {}
        }
	}

    getMarkers(){
        const {navData} = this.props;
        let markers;
        if(navData && navData.length) {
            markers = navData.map(marker => {
                const coordinate = {latitude: marker.latitude, longitude: marker.longitude};
                return (<Marker.Animated
                    key={marker.employeeId}
                    coordinate={coordinate}
                    title={marker.employeeId}
                    description={marker.message}
                    /*animation={
                        this.state.activeMarker
                            ? this.state.activeMarker.name === item.venue.name
                            ? "1"
                            : "0"
                            : "0"
                    }*/
                />)
            })
        }
        return markers;
    }

    getLatLong() {
        const {geoPosition} = this.props;
        if(geoPosition && geoPosition.coords) {
            const {coords} = geoPosition;
            const {latitudeDelta, longitudeDelta} = this.getLatLongDelta();
            // latitude: 12.971599, longitude: 77.594566
            return {
                center: {lat: -33.8688, lng: 151.2195},
                zoom: 13,
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta
            }
        }
    }

    getLatLongDelta() {
	    const {width, height} = Dimensions.get('window');
	    const ASPECT_RATIO = width / height;
	    const LATITUDE_DELTA = 3.7922; //0.0922
	    const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
	    return {latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA};
    }

    onChangeSearch(txt) {
        console.log(txt);
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => {this.props.fetchSearchFilterData(txt);}, 550)
    }

	render () {
        const {geoPosition, searchFilterData} = this.props;
        console.log("Geo Location => ", geoPosition);
	    return (
			<View style={styles.container}>
                { geoPosition ?
                    <MapView
                        provider={MapView.PROVIDER_GOOGLE}
                        style={styles.map}
                        region={this.getLatLong()}
                        // onRegionChange={this.onRegionChange}
                        >
                        {
                            this.getMarkers()
                        }
                    </MapView>
                    : null
                }
                <SearchBox onChangeSearch={this.onChangeSearch} searchFilterData={searchFilterData}/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: { ... StyleSheet.absoluteFillObject },
	map: { ...StyleSheet.absoluteFillObject }
});

MyNavigation.navigationOptions = {
	title: "Tracking System"
};
const mapStateToProps = (state) => ({
    geoPosition: state.main.geoPosition,
    navData: state.main.navData,
    searchFilterData: state.main.searchFilterData
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchSearchFilterData
},dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MyNavigation);
