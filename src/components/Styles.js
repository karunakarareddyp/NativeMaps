import {StyleSheet} from 'react-native'

const styles = StyleSheet.compose({
    buttonContainer: {
        alignSelf: "flex-end",
        bottom: 80,
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
        borderColor: '#ff5e3a',
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
    }
});

export default styles;