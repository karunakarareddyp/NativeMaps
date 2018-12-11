import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'react-autobind';
import {View, StyleSheet} from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import {getLatLongWithDeltas, getLatLongDeltaWithObject} from '../../utils/util';

//const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class MapContainer extends Component {
    constructor(props) {
		super(props);
        autobind(this);
		this.state = {
            // region: this.getLatLong(),
            polygons: [],
            holes: [],
        };
	}

	componentDidUpdate() {
        if(!this.props.creatingZone && this.state.polygons.length) {
            this.setState({polygons: []});
        }
    }

    getMarkers(markersData){
        let markers;
        if(markersData && markersData.length) {
            markers = markersData.map(marker => {
                const coordinate = {latitude: Number(marker.latitude), longitude: Number(marker.longitude)};
                return (<Marker.Animated
                    key={marker.deviceId}
                    coordinate={coordinate}
                    title={marker.deviceId}
                    description={marker.deviceId}
                />);
            });
        }
        return markers;
    }

    getCurrentPosition() {
        const {zonesData, geoPosition} = this.props;
        if(zonesData && zonesData.length) {
            const plainPoints = JSON.parse(zonesData[0].plainPoints);
            if(plainPoints && plainPoints.length) {
                // const point = plainPoints[Math.floor(plainPoints.length/2)];
                //return getLatLongWithDeltas({latitude:point[0], longitude:point[1]})
                return getLatLongWithDeltas(plainPoints);
            }
        }
        if(geoPosition && geoPosition.coords) {
            return getLatLongDeltaWithObject([geoPosition.coords])
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

    getZonesLatLng(points) {
        if(points && points.length) {
            return points.map(point => {
                return {latitude:point[0], longitude:point[1]}
            });
        }
    }

    drawPolygon() {
        const {zonesData, creatingZone} = this.props;
        const {polygons} = this.state;
        if(!creatingZone && zonesData && zonesData.length) {
            const zoneInfo = zonesData[0];
            return (<Polygon
                key={zoneInfo.name}
                coordinates={this.getZonesLatLng(JSON.parse(zoneInfo.plainPoints))}
                strokeColor="#F00"
                fillColor={zoneInfo.color}
                strokeWidth={1}
                options={{
                    editable: true,
                }}
            />)
        }
        if(creatingZone && polygons.length > 2) {
            return (<Polygon
                key={Math.random()}
                coordinates={polygons}
                strokeColor="#F00"
                fillColor="rgba(0,128,0,0.5)"
                strokeWidth={1}
                options={{
                    editable: true,
                }}
                // onMouseDown={onChangeStart}
            />)
        }
        return null;
    }

	render () {
        const { markersData, selectedMarker, creatingZone } = this.props;
        let markers, currentRegion;
        if(selectedMarker) {
            currentRegion = getLatLongDeltaWithObject(selectedMarker);
            markers = this.updateMarker(selectedMarker)
        } else {
            currentRegion = this.getCurrentPosition();
            markers = this.getMarkers(markersData);
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
                    {this.drawPolygon()}
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
