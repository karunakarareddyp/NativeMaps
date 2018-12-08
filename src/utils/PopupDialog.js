import React, {Component} from 'react';
import autobind from 'react-autobind';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from '../components/Styles';

class PopupDialog extends Component {
    constructor(props){
        super(props);
        autobind(this);
        this.state = {
            zoneName: undefined
        }
    }

    handleZoneName(text) {
        this.setState({zoneName: text});
    }

    onSubmitZone() {
        this.props.onSubmitZone(this.state.zoneName);
    }

    render() {
        return (
            <View style={styles.popup}>
                <Text style={styles.popupText}>Save Zone</Text>
                <TextInput style={styles.popupInput}
                           underlineColorAndroid="transparent"
                           placeholder="Enter zone name"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize="none"
                           onChangeText = {this.handleZoneName}
                />

                <TouchableOpacity
                    onPress={() => this.onSubmitZone()}
                    style={[styles.bubble, styles.button]}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default PopupDialog;
