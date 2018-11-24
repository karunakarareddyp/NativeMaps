import React, {Component} from "react";
import autobind from 'react-autobind';
import { Text, StyleSheet } from "react-native";
import { Footer, FooterTab, Button} from "native-base";
//import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Feather";

//tab bar items
const tabs = [
    {
        title:"Home",
        icon:"home",
        color: '#FF5E3A',
        id: 'home',
    },
    {
        title:"Alerts",
        icon:"alert-triangle", //alert-circle
        id: 'alerts'
    },
    {
        title:"Zones",
        icon: "octagon", //"shape-polygon-plus"
        id: 'zones'
    },
    {
        title:"History",
        icon:"info",
        id: 'history'
    }
];

class FooterContainer extends Component {

    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            selectedIndex: 0,
        }
    }

    onClickFooterTab(selectedTab, index) {
        this.setState({selectedIndex: index});
        this.props.onClickFooterTab(selectedTab)
    }
    render() {
        const { selectedIndex } = this.state;
        return (
            <Footer style={styles.footerContainer}>
                <FooterTab style={{width: 2, backgroundColor: 'black'}}>
                    {
                        tabs.map((obj, index) => {
                            return (
                                <Button key={obj.title} onPress={() => this.onClickFooterTab(obj.id, index)}>
                                    <Icon size={22} name={obj.icon} color={index === selectedIndex ? '#FF5E3A' : "grey"}/>
                                    <Text style={{
                                        fontSize: 12,
                                        color: (index === selectedIndex) ? "#FF5E3A" : "white"
                                    }}>{obj.title}</Text>
                                </Button>
                            )
                        })
                    }
                </FooterTab>
            </Footer>
        );
    }
};

const styles = StyleSheet.compose({
    footerContainer:{
        height: 25,
        backgroundColor:"transparent",
        bottom: 0,
        position: 'absolute',
    },
});
export default FooterContainer;
