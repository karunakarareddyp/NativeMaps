import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import autobind from 'react-autobind';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {Container} from 'native-base'
import {bindActionCreators} from 'redux';
import MapContainer from './MapContainer';
import SearchBox from "./SearchBox";
import FooterContainer from "./common/FooterContainer";
import {fetchSearchFilterData, fetchMarkersData, storeZoneInfo} from "../actions/mapsAction";
import styles from './Styles';
import PopupDialog from "../utils/PopupDialog";

let filterTimeout;
let zonePolygons;

class Home extends PureComponent {
	static navigationOptions = {
		title: 'Tracking System'
	};

	constructor(props) {
	    super(props);
        autobind(this);
        this.state = {
            selectedDevice: undefined,
            viewType: 'home',
            creatingZone: false,
            displayPopup: false,
        };
	}

    onChangeSearch(txt) {
        console.log(txt);
        if(txt.length === 0) {
            this.setState({selectedDevice: undefined});
        }
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => {this.props.fetchSearchFilterData(txt);}, 550)
    }

    onSelectEmployee(selectedItem) {
        Keyboard.dismiss();
        this.props.fetchMarkersData(selectedItem.deviceId);
        this.setState({
            selectedDevice: selectedItem.deviceId,
        });
    }

    onClickFooterTab(viewType) {
	    if(this.state.viewType !== viewType) {
            this.setState({
                viewType,
                creatingZone: false,
            })
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
	    this.props.storeZoneInfo(zoneName, zonePolygons);
    }

    selectedPolygons(polygons) {
        zonePolygons = polygons;
    }

	render(){
	    const {geoPosition, searchFilterData} = this.props;
	    const {viewType, creatingZone, selectedDevice, displayPopup} = this.state;
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
                    onSelectEmployee={this.onSelectEmployee}/>
                {
                    viewType === 'zones' ?
                        (<View style={styles.buttonContainer}>
                            {!creatingZone ?
                                (<TouchableOpacity
                                    onPress={() => this.onCreateZone()}
                                    style={[styles.bubble, styles.button]}
                                >
                                    <Text style={styles.buttonText}>Create Zone</Text>
                                </TouchableOpacity>) :
                                (<View style={{flexDirection: 'row'}}><TouchableOpacity
                                    onPress={() => this.onClearZone()}
                                    style={[styles.bubble, styles.button]}
                                >
                                    <Text style={styles.buttonText}>Clear Zone</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.onFinishZone()}
                                    style={[styles.bubble, styles.button]}
                                >
                                    <Text style={styles.buttonText}>Save Zone</Text>
                                </TouchableOpacity></View>)
                            }

                        </View>) : null
                }
                {displayPopup ? <PopupDialog onSubmitZone={this.onSubmitZone}/> : null}
                <FooterContainer onClickFooterTab={this.onClickFooterTab}/>
			</Container>
		);
	}
}


const mapStateToProps = (state) => ({
    geoPosition: state.main.geoPosition,
    searchFilterData: state.main.searchFilterData
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchSearchFilterData,
    fetchMarkersData,
    storeZoneInfo,
},dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Home);
