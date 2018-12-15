import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autobind from 'react-autobind';
import {View, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import MapView, { Marker, Polygon } from 'react-native-maps';
import {getLatLongWithDeltas, getLatLongDeltaWithObject} from '../../utils/util';
import {fetchMarkersData, fetchZones} from '../../actions/mapsAction';

class MapContainer extends PureComponent {
    constructor(props) {
		super(props);
        autobind(this);
		this.state = {
            region: undefined,
            //markersData: [],
            polygons: [],
        };
	}

	componentWillMount(){
        this.props.fetchZones(true);
        this.props.fetchMarkersData();
        this.handleMarkersData();
    }

	componentDidUpdate() {
        if(!this.props.creatingZone && this.state.polygons.length) {
            this.setState({polygons: []});
        }
    }

    handleMarkersData(){
        setInterval(() => {
            this.props.fetchMarkersData(this.props.selectedDevice)
        }, 10000); //Fetch every 10 seconds once
    }

    getCurrentPosition() {
        const { zonesData } = this.props;
        if(zonesData && zonesData.length) {
            const plainPoints = JSON.parse(zonesData[0].plainPoints);
            if(plainPoints && plainPoints.length) {
                return getLatLongWithDeltas(plainPoints);
            }
        }

        const { geoPosition } = this.props;
        if(geoPosition && geoPosition.coords) {
            return getLatLongDeltaWithObject([geoPosition.coords])
        }
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

    getRegion() {
        const { selectedDevice, markersData } = this.props;
        console.log(" selectedDevice =>", selectedDevice);
        if(selectedDevice && markersData && markersData.length === 1) {
            return getLatLongDeltaWithObject(markersData);
        }
        return this.getCurrentPosition();
    }

    drawSystemZones() {
        const {zonesData} = this.props;
        if( zonesData && zonesData.length) {
            const zoneInfo = zonesData[0];
            // console.log('zones info => ', zoneInfo);
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
    }

    drawPolygon(creatingZone) {
        const {polygons} = this.state;
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
            />)
        }
        return null;
    }

    drawMarkers() {
        const { markersData } = this.props;
        let markers;
        if(markersData && markersData.length) {
            markers = markersData.map(marker => {
                const coordinate = {latitude: Number(marker.latitude), longitude: Number(marker.longitude)};
                return (<Marker.Animated
                    key={marker.deviceId}
                    coordinate={coordinate}
                    title="Device Id"
                    description={marker.deviceId}
                />);
            });
        }
        return markers;
    }

	render () {
        const { creatingZone } = this.props;
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
                    region={this.getRegion()}
                    loadingEnabled = {true}
                    //moveOnMarkerPress = {false}
                    showsUserLocation={true}
                    showsCompass={true}
                    onPress={e => this.onPress(e)}
                    {...mapOptions}
                    // onRegionChange={this.onRegionChange}
                    >
                    {this.drawSystemZones()}
                    {this.drawMarkers()}
                    {this.drawPolygon(creatingZone)}
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

MapContainer.defaultProps = {
    zonesData: [],
    markersData: [],
    selectedDevice: undefined
};

MapContainer.propTypes = {
    markersData: PropTypes.array,
    zonesData: PropTypes.array,
    selectedDevice: PropTypes.number,
    fetchZones: PropTypes.func.isRequired,
    fetchMarkersData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    zonesData: state.main.zonesData,
    markersData: state.main.markersData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchZones,
    fetchMarkersData,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
