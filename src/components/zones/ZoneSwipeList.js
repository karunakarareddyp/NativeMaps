import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, ListView, Text, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {fetchZones, removeZone} from '../../actions/mapsAction';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class ZoneSwipeList extends Component {
    componentWillMount() {
        this.props.fetchZones();
    }

    deleteNote(selectedRow){
        console.log("Delete Selected ", selectedRow);
        this.props.removeZone(selectedRow.name);
    }

    onSelectZone(zoneName) {
        this.props.fetchZones(zoneName);
        this.props.onSelectZone(zoneName);
    }

    _renderRow(rowData: string) {
        let deleteButton = [{
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => { this.deleteNote(rowData) }
        }];
        return (
            <Swipeout right={deleteButton} autoClose={true}>
                <TouchableWithoutFeedback onPress={() => this.onSelectZone(rowData.name)}>
                    <View style={styles.li} >
                        <Text style={styles.liText}>{rowData.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Swipeout>
        );
    }

    getDataSource(){
        const {zonesData} = this.props;
        return ds.cloneWithRows(zonesData)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <TouchableOpacity style={styles.back} onPress={() => this.props.onClickBackButton()}>
                        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>&larr;</Text>
                    </TouchableOpacity>
                    <Text style={styles.navbarTitle}>Zone List</Text>
                </View>
                <ListView
                    scrollEnabled
                    dataSource={this.getDataSource()}
                    renderRow={this._renderRow.bind(this)}
                    style={styles.listview}
                />
            </View>
        );
    }

}
let styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255,0.5)',
        flex: 1,
    },
    listview: {
        flex: 1,
    },
    li: {
        backgroundColor: 'rgba(88,204,237,0.3)',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom: 16,
    },
    liText: {
        color: '#333',
        fontSize: 16,
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        marginBottom: 5,
        justifyContent: 'center',
        height: 50,
    },
    navbarTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: "500",
    },
    back: {
        position: 'absolute',
        //top: 20,
        left: 2,
        backgroundColor: 'rgba(88,204,237,0.4)',
        padding: 2,
        borderRadius: 10,
        width: 60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state) => ({
    zonesData: state.main.zonesData,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchZones,
    removeZone,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ZoneSwipeList);
