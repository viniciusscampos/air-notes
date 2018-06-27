import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableWithoutFeedback, Dimensions, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ARKit } from 'react-native-arkit';
import { Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Note from '../components/note';
import AnchorScanner from './anchorScanner';
import R from 'ramda';

import { post } from '../api/api';
import * as noteActions from '../actions/noteActions';
import * as anchorActions from '../actions/anchorActions';

class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      title: null,
      body: null,
      modalVisible: false,
      cameraPosition: null,
      cameraRotation: null,
      hide: false
    }
    this.addNote = this.addNote.bind(this);
  }

  componentWillMount() {
  }

  async addNote(position) {
    const { title, body, cameraPosition, cameraRotation } = this.state;
    let hasError = false;
    if (!title) {
      this.InputTitle.shake();
      hasError = true;
    }
    if (!body) {
      this.InputBody.shake();
      hasError = true;
    }
    if (hasError) return;
    const userId = await AsyncStorage.getItem('user_id');
    const note = {
      title: title,
      body: body,
      author: userId,
      position: cameraPosition,
      rotation: cameraRotation
    }
    this.props.actions.publishNote(note);
    this.setState({
      modalVisible: false,
      title: null,
      body: null,
      cameraPosition: null,
      cameraRotation: null
    })
  }

  render() {
    console.log("Redux state: ", this.props);
    return (
      <View style={{ flex: 1 }}>
        <ARKit
          style={{ flex: 1 }}
          planeDetection={ ARKit.ARPlaneDetection.Horizontal }
          lightEstimationEnabled
          debug
          onARKitError={(err) => console.log(err)}
        >
          {R.map((note) =>
            ( <Note
                key={Math.random()}
                title={note.title}
                position={note.position}
                color={note.color}
            /> )
             , this.props.note.notes || [])}
        </ARKit>
        <Icon
          name="add-circle"
          color="green"
          size={50}
          containerStyle={styles.button}
          onPress={async () => {
              const cameraStats = await ARKit.getCamera();
              this.setState({
                cameraPosition: cameraStats.position,
                cameraRotation: cameraStats.rotation,
                modalVisible: true
              });
          }}
        />
        <Icon
          name="anchor"
          type="font-awesome"
          color="grey"
          size={40}
          containerStyle={styles.buttonLeft}
          onPress={async () => {
              Actions.anchorScanner();
          }}
        />
        <View>
          <Modal isVisible={this.state.modalVisible}>
            <View style={styles.modalView}>
              <View style={{ flex: 1 , alignSelf: 'center', paddingTop: 20}}>
                <Text style={styles.titleText}>Insert Info</Text>
              </View>
              <View style={{ flex: 2 }}>
                <FormLabel>Title</FormLabel>
                <FormInput
                  ref={ref => this.InputTitle = ref}
                  onChangeText={(text) => this.setState({title: text})}/>
                <FormLabel>Body</FormLabel>
                <FormInput
                  ref={ref => this.InputBody = ref}
                  onChangeText={(text) => this.setState({body: text})}/>
              </View>
              <View style={{ flex: 1 }}>
                <Button title='Confirmar' onPress={() => this.addNote()}/>
              </View>
            </View>
          </Modal>
        </View>
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
  },
  buttonLeft: {
    position: 'absolute',
    zIndex: 5,
    left: 0,
    bottom: 0,
    paddingLeft: 25,
    paddingBottom: 25
  },
  modalView: {
    flex:1,
    backgroundColor: 'white',
    marginTop: 150,
    marginBottom: 150,
    borderRadius: 5
  },
  titleText: {
    color: '#86939e',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default connect(({routes, note, anchor}) => ({routes, note, anchor}),
  (dispatch) => ({
    actions: bindActionCreators({...noteActions, ...anchorActions}, dispatch)
  }))(HomeMenu);
