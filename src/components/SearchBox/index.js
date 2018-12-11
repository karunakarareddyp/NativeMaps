import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import {Text} from 'react-native';
import {View, InputGroup, Input, List, ListItem, Left, Body} from 'native-base';
import styles from './SearchBoxStyles.js';
import Icon from "react-native-vector-icons/FontAwesome";

class SearchBox extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            searchOn: false,
            //selectedMarker: null,
        };
    }

    onSearchChange(txt) {
        //const filterList = this.state.ds.filter(data => data.name.toLowerCase().indexOf(txt.toLowerCase()) > -1);
        this.setState({searchOn: txt.length > 0});
        this.props.onChangeSearch(txt)
    }

    handleSelectedAddress(item) {
        this.setState({
            searchOn: false,
            //selectedMarker: evt.employeeId
        });
        this.props.onSelectEmployee(item);
    }
    render() {
        const {searchFilterData} = this.props;
        const {searchOn} = this.state;
        return (
            <View style={styles.searchBox}>
                <View style={styles.inputWrapper}>
                    <InputGroup>
                        <Icon name="search" size={15} color="#ff5e3a"/>
                        <Input
                            //onFocus={()=>toggleSearchResultModal("pickUp")}
                            autoCapitalize="none"
                            style={styles.inputSearch}
                            placeholder="Search using employee ID"
                            onChangeText={ this.onSearchChange }
                            //value={selectedMarker}
                        />
                        {searchOn && searchFilterData && searchFilterData.length ?
                            <View style={styles.searchResultsWrapper}>
                                <List
                                    dataArray={searchFilterData}
                                    renderRow={item =>
                                        <ListItem key={item.employeeId}
                                                  onPress={() => this.handleSelectedAddress(item)}
                                                  // onLongPress={() => this.handleSelectedAddress(item.employeeId)}
                                                  button={true}
                                                  avatar>
                                            <Left style={styles.leftContainer}>
                                                <Icon name="search" size={15} color="#FF5E3A"/>
                                            </Left>
                                            <Body>
                                            <Text style={styles.primaryText}>{item.employeeId}</Text>
                                            <Text style={styles.secondaryText}>
                                                Lat: {item.latitude}, Long: {item.longitude}
                                            </Text>
                                            </Body>
                                        </ListItem>
                                    }
                                />
                            </View> : null
                        }

                    </InputGroup>
                </View>
            </View>
        );
    }
};

SearchBox.propTypes = {
    onChangeSearch: PropTypes.func,
    searchFilterData: PropTypes.array,
    onSelectEmployee: PropTypes.func,
};

export default SearchBox;