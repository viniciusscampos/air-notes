import React, { Component } from 'react';
import {  AppRegistry, Text, View, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ARKit } from 'react-native-arkit';
import { Icon } from 'react-native-elements';
import Note from '../components/note';
import R from 'ramda';

class HomeMenu extends Component {
  constructor(props) {
    super(props);
    const firstNote = {
      text: 'texto teste',
      position: {x: 0, y: 0, z: 0},
      color: "#ffff00"
    };
    this.state = {
      notes: [firstNote]
    }
  }

  componentWillMount() {
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
          {R.map((note) =>
            ( <Note
                key={Math.random()}
                text={note.text}
                position={note.position}
                color={note.color}
            /> )
             , this.state.notes)}
        </ARKit>
        <Icon
          name="add-circle"
          color="green"
          size={60}
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
    paddingRight: 25,
    paddingBottom: 25
  }
});

export default connect(({routes, user, chat}) => ({routes, user, chat}),
  (dispatch) => ({
    actions: bindActionCreators({}, dispatch)
  }))(HomeMenu);
