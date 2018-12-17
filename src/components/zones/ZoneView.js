import React, {PureComponent} from 'react';
import autobind from 'react-autobind';
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../Styles";
import PopupDialog from "../../utils/PopupDialog";
import ZoneSwipeList from "./ZoneSwipeList";

class ZoneView extends PureComponent {

    constructor(props){
        super(props);
        autobind(this);
        this.state = {
            showZoneList: false,
        };
    }

    onZoneList() {
        this.setState({showZoneList: true})
    }

    onClickBackButton() {
        this.setState({showZoneList: false});
    }

    onSelectZone() {
        this.setState({showZoneList: false});
    }

    render() {
        const {viewType, creatingZone, displayPopup} = this.props;
        const {showZoneList} = this.state;
        return (
            <>
                {
                    viewType === 'zones' ?
                        (<View style={styles.buttonContainer}>
                            {!creatingZone ?
                                (<View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={this.onZoneList}
                                        style={[styles.bubble, styles.button]}>
                                        <Text style={styles.buttonText}>Zone List</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.props.onCreateZone()}
                                        style={[styles.bubble, styles.button]}>
                                        <Text style={styles.buttonText}>Create Zone</Text>
                                    </TouchableOpacity>
                                </View>) :
                                (<View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() => this.props.onClearZone()}
                                        style={[styles.bubble, styles.button]}>
                                        <Text style={styles.buttonText}>Clear Zone</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.props.onFinishZone()}
                                        style={[styles.bubble, styles.button]}>
                                        <Text style={styles.buttonText}>Save Zone</Text>
                                    </TouchableOpacity>
                                </View>)
                            }

                        </View>) : null
                }
                {displayPopup ? <PopupDialog onSubmitZone={this.props.onSubmitZone}/> : null}
                {showZoneList ? <ZoneSwipeList onSelectZone={this.onSelectZone} onClickBackButton={this.onClickBackButton}/> : null}
            </>
        );
    }
}

export default ZoneView;