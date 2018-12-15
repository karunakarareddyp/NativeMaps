import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import {Text} from 'react-native';
import {View, InputGroup, Input, List, ListItem, Left, Body} from 'native-base';
import styles from './SearchBoxStyles.js';
import Icon from "react-native-vector-icons/FontAwesome";

class SearchBox extends PureComponent {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            searchOn: false,
            selectedObject: '',
        };
    }

    onSearchChange(txt) {
        //const filterList = this.state.ds.filter(data => data.name.toLowerCase().indexOf(txt.toLowerCase()) > -1);
        this.setState({
            selectedObject: txt,
            searchOn: txt.length > 0
        });
        this.props.onChangeSearch(txt)
    }

    handleSelectedAddress(item) {
        this.setState({
            searchOn: false,
            selectedObject: `${item.lastName} ${item.firstName}`
        });
        this.props.onSelectEmployee(item);
    }
    render() {
        const {searchFilterData} = this.props;
        const {searchOn, selectedObject} = this.state;
        return (
            <View style={styles.searchBox}>
                <View style={styles.inputWrapper}>
                    <InputGroup>
                        <Icon name="search" size={15} color="#ff5e3a"/>
                        <Input
                            autoCapitalize="none"
                            style={styles.inputSearch}
                            placeholder="Search with employee name"
                            onChangeText={ this.onSearchChange }
                            value={selectedObject}
                            multiline={true}
                        />
                        {searchOn && searchFilterData && searchFilterData.length ?
                            <View style={styles.searchResultsWrapper}>
                                <List
                                    dataArray={searchFilterData}
                                    renderRow={item =>
                                        <ListItem key={item.deviceId}
                                                  onPress={() => this.handleSelectedAddress(item)}
                                                  // onLongPress={() => this.handleSelectedAddress(item.employeeId)}
                                                  button={true}
                                                  avatar>
                                            <Left style={styles.leftContainer}>
                                                <Icon name="search" size={15} color="#FF5E3A"/>
                                            </Left>
                                            <Body>
                                            <Text style={styles.primaryText}>{item.lastName} {item.firstName}</Text>
                                            <Text style={styles.secondaryText}>
                                                Device ID - {item.deviceId}
                                            </Text>
                                            {/*<Text style={styles.secondaryText}>
                                                Lat: {item.latitude}, Long: {item.longitude}
                                            </Text>*/}
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