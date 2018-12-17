import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autobind from 'react-autobind';
import {View, StyleSheet, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import MapView, { Marker, Polygon, Polyline} from 'react-native-maps';
import {getLatLongWithDeltas, getLatLongDeltaWithObject} from '../../utils/util';
import {fetchMarkersData, fetchZones} from '../../actions/mapsAction';
import avatar5 from '../../assets/images/avatar5.png'
import ImageMarker from '../../utils/ImageMarker'

class MapContainer extends Component {
    constructor(props) {
		super(props);
        autobind(this);
		this.state = {
            region: undefined,
            polygonColor: undefined,
            polygons: [],
        };
	}

	componentWillMount(){
        this.props.fetchZones();
        this.props.fetchMarkersData();
        this.handleMarkersData();
    }

	componentDidUpdate() {
        const {polygons, polygonColor} = this.state;
        const {creatingZone} = this.props;
        if(!creatingZone && polygons.length) {
            this.setState({polygons: [], polygonColor: undefined});
        }
        if(creatingZone && !polygonColor) {
            this.setState({polygonColor: `rgba(${(Math.floor(Math.random() * 255))},${(Math.floor(Math.random() * 255))},${(Math.floor(Math.random() * 255))},0.2)`});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.creatingZone && nextState.polygons.length <= 2) {
            return false;
        }
        return true;
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
            this.props.selectedPolygons(polygons, this.state.polygonColor);
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
        const { selectedDevice, markersData, historyData } = this.props;
        const {polygons} = this.state;
        if(polygons.length) {
            return getLatLongDeltaWithObject(polygons);
        }
        if(selectedDevice && historyData && historyData.length) {
            return getLatLongDeltaWithObject(historyData);
        }
        if(selectedDevice && markersData && markersData.length === 1) {
            return getLatLongDeltaWithObject(markersData);
        }
        return this.getCurrentPosition();
    }

    drawZones() {
        const {zonesData} = this.props;
        if( zonesData && zonesData.length) {
            return zonesData.map(zone => {
                return (<Polygon
                    key={zone.name}
                    coordinates={this.getZonesLatLng(JSON.parse(zone.plainPoints))}
                    strokeColor="#F00"
                    fillColor={zone.color}
                    strokeWidth={1}
                    options={{
                        editable: true,
                    }}
                />)
            })
        }
    }

    drawPolygon() {
        const {creatingZone} = this.props;
        const {polygons, polygonColor} = this.state;
        if(creatingZone && polygons.length > 2) {
            return (<Polygon
                key={Math.random()}
                coordinates={polygons}
                strokeColor="#F00"
                //fillColor="rgba(0,128,0,0.2)"
                fillColor={polygonColor}
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
                const user = marker.userDetail[0];
                return (<Marker.Animated
                    key={marker.deviceId}
                    //image={avatar5}
                    coordinate={coordinate}
                    title="Workmen Info"
                    description={user ?
                        `Name : ${user.lastName} ${user.firstName}\nDevice ID: ${marker.deviceId}\nZone: ${user.zone}\nUser ID: ${user.userId}`
                        : marker.deviceId
                    }
                >
                    <ImageMarker source={avatar5}/>
                </Marker.Animated>);
            });
        }
        return markers;
    }

    drawHistoryPolyLine() {
        const {historyData} = this.props;
        if(historyData && historyData.length) {
           return (
               <Polyline
                   coordinates={historyData.map(obj => {return {latitude: obj.latitude, longitude: obj.longitude}})}
                   strokeColor="#E75D40" // fallback for when `strokeColors` is not supported by the map-provider
                   strokeWidth={4}
            />);
        }
    }

	render () {
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
                    scrollEnabled={true}
                    // onRegionChange={this.onRegionChange}
                    >
                    {this.drawZones()}
                    {this.drawMarkers()}
                    {this.drawPolygon()}
                    {this.drawHistoryPolyLine()}
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
    historyData: [],
    selectedDevice: undefined
};

MapContainer.propTypes = {
    markersData: PropTypes.array,
    zonesData: PropTypes.array,
    historyData: PropTypes.array,
    selectedDevice: PropTypes.string,
    fetchZones: PropTypes.func.isRequired,
    fetchMarkersData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    zonesData: state.main.zonesData,
    markersData: state.main.markersData,
    historyData: state.main.historyData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchZones,
    fetchMarkersData,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
