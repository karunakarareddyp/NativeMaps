import React, {PureComponent} from "react";
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
        id: 'home',
    },
    {
        title:"Alerts",
        icon:"alert-triangle", //alert-circle
        id: 'alerts',
        notes: 120
    },
    {
        title:"Zones",
        icon: "octagon", //"shape-polygon-plus"
        id: 'zones'
    },
    {
        title:"History",
        icon:"activity",
        id: 'history'
    }
];

class FooterContainer extends PureComponent {

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
                                    <Icon size={22} name={obj.icon} color={index === selectedIndex ? 'orange' : obj.notes ? "red" : "grey"}/>
                                    <Text style={{
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        color: (index === selectedIndex) ? "orange" : "white"
                                    }}>{obj.title}
                                        {obj.notes ? ` (${obj.notes})` : null}
                                    </Text>

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
