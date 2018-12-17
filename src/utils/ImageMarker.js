import React from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ImageMarker extends React.Component {
  render() {
    const { source } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
            <Image
              source={source}
              style={{ height: 30, width: 30, borderRadius: 15 }}
              resizeMode="contain"
            />
            <View style={{width:21}}>
                <Icon size={25} name='battery-50' color='yellow' />
            </View>
        </View>
        <View style={styles.arrow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#FF5A5F',
        padding: 2,
        borderRadius: 3,
        borderColor: '#D23F44',
        borderWidth: 1.5,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 8,
        borderColor: 'transparent',
        borderTopColor: '#D23F44',
        alignSelf: 'center',
        marginTop: 0,
    },
});

export default ImageMarker;
