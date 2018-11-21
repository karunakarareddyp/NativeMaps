import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const styles = {
    searchBox:{
        top:80,
        position:"absolute",
        width:width
    },
    inputWrapper:{
        marginLeft:7,
        marginRight:7,
        marginTop:10,
        marginBottom:0,
        backgroundColor:'#DFFCFF',
        opacity:0.9,
        borderRadius:7
    },
    secondInputWrapper:{
        marginLeft:15,
        marginRight:10,
        marginTop:0,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    },
    inputSearch:{
        fontSize:14,
        height: 30
    },
    label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0
    },


    ///
    searchResultsWrapper:{
        top:33,
        position:"absolute",
        width:width,
        height:height/2,
        backgroundColor:"#fff",
        opacity:0.9,
        scroll: 'auto'
    },
    primaryText:{
        fontWeight: "bold",
        color:"#373737"
    },
    secondaryText:{
        fontStyle: "italic",
        color:"#7D7D7D",
    },
    leftContainer:{
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor:"#7D7D7D",
    },
    leftIcon:{
        fontSize:20,
        color:"#7D7D7D",
    },
    distance:{
        fontSize:12,
    }

};

export default styles;