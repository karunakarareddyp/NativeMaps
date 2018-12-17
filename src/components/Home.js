import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import autobind from 'react-autobind';
import {Keyboard} from 'react-native';
import {Container, View, Text} from 'native-base'
import {bindActionCreators} from 'redux';
import MapContainer from './MapContainer';
import SearchBox from "./SearchBox";
import FooterContainer from "./common/FooterContainer";
import {
    fetchZones,
    fetchSearchFilterData,
    fetchMarkersData,
    storeZoneInfo,
    fetchHistoryData
} from "../actions/mapsAction";
import Styles from './Styles';
import {FETCH_HISTORY_DATA} from '../constants';

import ZoneView from "./zones/ZoneView";

let filterTimeout;
let zonePolygons;
let zonePolygonColor;

const initialState = {
    selectedDevice: undefined,
    viewType: 'home',
    creatingZone: false,
    displayPopup: false,
    clearSearch: false,
    displayHistoryInfo: false,
};

class Home extends PureComponent {
	static navigationOptions = {
		title: 'Workmen Tracker'
	};

	constructor(props) {
	    super(props);
        autobind(this);
        this.state = initialState
	}

    onChangeSearch(txt) {
        console.log(txt);
        if(txt.length === 0) {
            this.setState({selectedDevice: undefined});
            this.props.clearHistory();
        }
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => {this.props.fetchSearchFilterData(txt);}, 550)
    }

    onSelectEmployee(currentDevice) {
        Keyboard.dismiss();
        const {selectedDevice, viewType} = this.state;
        const {deviceId} = currentDevice;
        if(selectedDevice !== deviceId) {
            this.setState({
                selectedDevice: deviceId,
            });
            this.props.fetchMarkersData(deviceId);
            if(viewType === 'history') {
                this.props.fetchHistoryData(deviceId);
            }
        }
    }

    onClickFooterTab(viewType) {
	    const prevViewType = this.state.viewType;
	    if(prevViewType !== viewType) {
            this.setState({
                viewType,
                creatingZone: false,
                clearSearch: (viewType === 'home'),
            });
            if(viewType === 'zones') {
                this.props.fetchZones();
            }
            if(prevViewType === 'history'){
                this.setState({displayHistoryInfo: false});
                this.props.clearHistory();
            }
            const {selectedDevice} = this.state;
            if(viewType === 'history') {
                if(selectedDevice) {
                    this.setState({displayHistoryInfo: false});
                    this.props.fetchHistoryData(selectedDevice);
                } else {
                    this.setState({displayHistoryInfo: true});
                }
            }
            if(viewType === 'home') {
                this.setState({
                    clearSearch: true
                });
                setTimeout(() => this.setState(initialState), 10);
                this.props.fetchZones();
            }
        }
    }

    onCreateZone() {
        this.setState({creatingZone: true});
    }

    onClearZone() {
	    this.setState({creatingZone: false, displayPopup: false,});
    }

    onFinishZone() {
	    if(zonePolygons && zonePolygons.length > 1) {
            this.setState({displayPopup: true})
        }
    }

    onSubmitZone(zoneName) {
	    this.setState({
            creatingZone: false,
            displayPopup: false,
        });
	    this.props.storeZoneInfo(zoneName, zonePolygons, zonePolygonColor);
    }

    selectedPolygons(polygons, polygonColor) {
        zonePolygons = polygons;
        zonePolygonColor = polygonColor;
    }

	render(){
	    const {geoPosition, searchFilterData} = this.props;
	    const {viewType, creatingZone, selectedDevice, displayPopup, clearSearch, displayHistoryInfo} = this.state;
		return(
			<Container style={{flex: 1}}>
                <MapContainer
                    geoPosition={geoPosition}
                    selectedDevice={selectedDevice}
                    creatingZone={creatingZone}
                    selectedPolygons={this.selectedPolygons}
                />
                <SearchBox
                    onChangeSearch={this.onChangeSearch}
                    searchFilterData={searchFilterData}
                    clearSearch={clearSearch}
                    onSelectEmployee={this.onSelectEmployee}
                />
                <ZoneView
                    viewType={viewType}
                    creatingZone={creatingZone}
                    displayPopup={displayPopup}
                    onCreateZone={this.onCreateZone}
                    onClearZone={this.onClearZone}
                    onFinishZone={this.onFinishZone}
                    onSubmitZone={this.onSubmitZone}
                />
                {displayHistoryInfo && !selectedDevice ?
                    (<View style={Styles.historyInfo}>
                        <Text style={Styles.historyInfoText}>&#9432; - Select employee to see the history.</Text>
                    </View>): null}
                <FooterContainer onClickFooterTab={this.onClickFooterTab}/>
			</Container>
		);
	}
}


const mapStateToProps = (state) => ({
    geoPosition: state.main.geoPosition,
    searchFilterData: state.main.searchFilterData,
    historyData: state.main.historyData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchZones,
    fetchSearchFilterData,
    fetchMarkersData,
    storeZoneInfo,
    fetchHistoryData,
    clearHistory: () => dispatch({type: FETCH_HISTORY_DATA})
},dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Home);
