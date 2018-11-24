import React, {Component} from 'react';
import {connect} from 'react-redux';
import autobind from 'react-autobind';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Container} from 'native-base'
import {bindActionCreators} from 'redux';
import MapContainer from './MapContainer';
import SearchBox from "./SearchBox";
import FooterContainer from "./common/FooterContainer";
import {getCurrentLocation, fetchMarkersData, fetchSearchFilterData} from "../actions/mapsAction";
import styles from './Styles';

let filterTimeout;

class Home extends Component {
	static navigationOptions = {
		title: 'Tracking System'
	};

	constructor(props) {
	    super(props);
        autobind(this);
        this.state = {
            selectedEmployee: undefined,
            viewType: 'home',
            creatingZone: false,
        };
	}

    componentWillMount() {
        this.props.getCurrentLocation();
        this.props.fetchMarkersData();
    }

    onChangeSearch(txt) {
        console.log(txt);
        if(txt.length === 0) {
            this.setState({selectedEmployee: undefined});
        }
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => {this.props.fetchSearchFilterData(txt);}, 550)
    }

    onSelectEmployee(selectedItem) {
        Keyboard.dismiss();
        this.setState({
            //region: this.regionContainingPoints([selectedItem]),
            selectedEmployee: [selectedItem],
        });
    }

    onClickFooterTab(viewType) {
	    console.log("View Types => ", viewType)
	    this.setState({viewType})
    }

    onCreateZone() {
        this.setState({creatingZone: true});
    }
    onFinishZone() {
        this.setState({creatingZone: false});
    }
	render(){
	    const {geoPosition, employeeData, searchFilterData} = this.props;
	    const {viewType, creatingZone, selectedEmployee} = this.state;
		return(
			<Container style={{flex: 1}}>
                <MapContainer
                    geoPosition={geoPosition}
                    employeeData={employeeData}
                    selectedEmployee={selectedEmployee}
                    creatingZone={creatingZone}
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
                                (<TouchableOpacity
                                    onPress={() => this.onFinishZone()}
                                    style={[styles.bubble, styles.button]}
                                >
                                    <Text style={styles.buttonText}>Finish Zone</Text>
                                </TouchableOpacity>)
                            }

                        </View>) : null
                }
                <FooterContainer onClickFooterTab={this.onClickFooterTab}/>
			</Container>
		);
	}
}


const mapStateToProps = (state) => ({
    geoPosition: state.main.geoPosition,
    employeeData: state.main.employeeData,
    searchFilterData: state.main.searchFilterData
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCurrentLocation,
    fetchMarkersData,
    fetchSearchFilterData
},dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (Home);
