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
    this.state = {
      notes: []
    }
    this.addNote = this.addNote.bind(this);
  }

  componentWillMount() {
  }

  async addNote(position) {
    const numberText = this.state.notes.length;
    const note = {
      color: '#f1d161',
      text: `texto teste ${numberText}`,
      position: position
    }
    this.setState((previousState) => ({
      notes: R.concat(previousState.notes, [note])
    }));
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
          onPress={async () => {
              const cameraStats= await ARKit.getCamera();
              this.addNote(cameraStats.position);
          }}
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
