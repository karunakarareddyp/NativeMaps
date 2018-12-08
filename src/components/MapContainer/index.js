import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'react-autobind';
import {View, StyleSheet} from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import {getLatLongWithDeltas, getMarkersWithDelta} from '../../utils/util';

//const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class MapContainer extends Component {
    constructor(props) {
		super(props);
        autobind(this);
		this.state = {
            region: this.getLatLong(),
            polygons: [],
            holes: [],
        };
	}

	componentDidUpdate() {
        if(!this.props.creatingZone && this.state.polygons.length) {
            this.setState({polygons: []});
        }
    }

	getMarkers(employeeData){
        let markers;
        if(employeeData && employeeData.length) {
            markers = employeeData.map(marker => {
                const coordinate = {latitude: marker.latitude, longitude: marker.longitude};
                return (<Marker.Animated
                    key={marker.employeeId}
                    coordinate={coordinate}
                    title={marker.employeeId}
                    description={marker.message}
                />);
            });
        }
        return markers;
    }

    getLatLong() {
        const {geoPosition} = this.props;
        if(geoPosition && geoPosition.coords) {
            return getLatLongWithDeltas(geoPosition.coords)
        }
    }

    updateMarker(selectedEmp){
        return this.getMarkers(selectedEmp);
    }

    onPress(e) {
        const { creatingZone } = this.props;
        if(creatingZone) {
            let polygons = [...this.state.polygons, e.nativeEvent.coordinate];
            this.setState({
                polygons
            });
            this.props.selectedPolygons(polygons);
        }
    }

	render () {
        const { employeeData, selectedEmployee, creatingZone } = this.props;
        let markers, currentRegion;
        if(selectedEmployee) {
            currentRegion = getMarkersWithDelta(selectedEmployee);
            markers = this.updateMarker(selectedEmployee)
        } else {
            currentRegion = this.getLatLong();
            markers = this.getMarkers(employeeData);
        }
        const mapOptions = {
            scrollEnabled: true,
        };

        if (creatingZone) {
            //mapOptions.scrollEnabled = false;
            mapOptions.onPanDrag = e => this.onPress(e);
        }

        return (
            <View style={styles.container}>
                <MapView
                    ref={ref => { this.map = ref; }}
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.map}
                    region={currentRegion}
                    loadingEnabled = {true}
                    //moveOnMarkerPress = {false}
                    showsUserLocation={true}
                    showsCompass={true}
                    onPress={e => this.onPress(e)}
                    {...mapOptions}
                    // onRegionChange={this.onRegionChange}
                    >
                    {markers}
                    {this.state.polygons.length ?
                        <Polygon
                            key={Math.random()}
                            coordinates={this.state.polygons}
                            strokeColor="#F00"
                            fillColor="rgba(255,0,0,0.5)"
                            strokeWidth={1}
                            options={{
                                editable: true,
                            }}
                            // onMouseDown={onChangeStart}
                        /> : null
                    }
                </MapView>
            </View>
        );
	}
}
const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    ... StyleSheet.absoluteFillObject,
    },
	map: { ...StyleSheet.absoluteFillObject },

});


const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(MapContainer);
