import {Dimensions, StyleSheet} from 'react-native'

const baseColor = 'orange'; //'#ff5e3a';
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.compose({
    buttonContainer: {
        alignSelf: "flex-end",
        bottom: 60,
        position: 'absolute',
        //flexDirection: 'row',
        //marginVertical: 15,
        backgroundColor: 'transparent',
    },

    bubble: {
        backgroundColor: 'rgba(255,253,223,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: baseColor,
        marginBottom: 10,
    },

    button: {
        width: 110,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginHorizontal: 10,

    },

    buttonText: {
        fontWeight: 'bold',
    },

    popup: {
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        margin:30,
        marginTop: windowHeight/3,
        borderRadius:10,
        backgroundColor: 'rgba(223,252,255,0.9)'
    },

    popupText: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 16,
        color: baseColor,
        marginBottom: 12,
    },

    popupInput: {
        width: 250,
        marginBottom: 15,
        padding: 5,
        height: 40,
        borderColor: baseColor,
        borderWidth: 1,
        borderRadius: 5,
    },

    historyInfo: {
        alignSelf: 'center',
        bottom: 70,
        position: 'absolute',
        backgroundColor: 'rgba(255,253,223,0.7)',
    },

    historyInfoText: {
        fontWeight: 'bold',
        color: baseColor,
    }
});

export default styles;