import React, { Component } from 'react';
import {  AppRegistry, Text, View, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ARKit } from 'react-native-arkit';
import { Icon } from 'react-native-elements';

class HomeMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={{ flex: 1 }}>
        <ARKit
          style={{ flex: 1 }}
          debug
          planeDetection={ ARKit.ARPlaneDetection.Horizontal }
          lightEstimationEnabled
        >
          <ARKit.Text
            text="ARKit is Cool!"
            position={{ x: 0.2, y: 0.6, z: 0 }}
            font={{ size: 0.15, depth: 0.05 }}
          />
        </ARKit>
        <Icon
          name="add-circle"
          color="green"
          size={35}
          containerStyle={styles.button}
          onPress={() => alert('add post')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    zIndex: 5,
    right: 0,
    bottom: 0,
    paddingRight: 20,
    paddingBottom: 20
  }
});

export default connect(({routes, user, chat}) => ({routes, user, chat}),
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch)
  }))(HomeMenu);
