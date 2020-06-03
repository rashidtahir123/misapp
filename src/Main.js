import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Routes from './components/Routes';

class Main extends Component<{}> {

	render() {
    const {authData:{isLoggedIn}} = this.props;
		return(

              <View style={styles.container}>
                 <View
                     style={{
                         backgroundColor: '#044421',
                         height: Platform.OS === 'ios' ? getStatusBarHeight():0,
                       }}>
                       <StatusBar
                         translucent
                         backgroundColor="#044421"
                         barStyle="light-content"
                       />
                 </View>
                  <Routes isLoggedIn={isLoggedIn} />
              </View>

			)
	}
}

const styles = StyleSheet.create({
  container : {
    flex: 1
  }
});

mapStateToProps = state => ({
    authData: state.authReducer.authData
})

export default connect(mapStateToProps, null)(Main)
