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
      error: {
        title: "",
        body: ""
      },
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
    let error = {
      title: "",
      body: ""
    }
    if (!title) {
      error.title = "This field is required";
      this.InputTitle.shake();
      hasError = true;
    } else if (title.length > 30) {
      error.title = "Title must have less than 30 characters";
      this.InputTitle.shake();
      hasError = true;
    }

    if (!body) {
      error.body = "This field is required";
      this.InputBody.shake();
      hasError = true;
    } else if (body.length > 150) {
      error.body = "Body must have less than 150 characters";
      this.InputBody.shake();
      hasError = true;
    }

    this.setState({error});
    if (hasError) {
      return;
    }
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
          debug
          style={{ flex: 1 }}
          planeDetection={ ARKit.ARPlaneDetection.Horizontal }
          lightEstimationEnabled
          onARKitError={(err) => console.log(err)}
          origin={{position: this.props.anchor.position}}
        >
          {R.map((note) =>
            ( <Note
                key={Math.random()}
                title={note.title}
                position={note.position}
                color={note.color}
                body={note.body}
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
              <View style={{ flex: .8 , alignSelf: 'center', paddingTop: 20}}>
                <Text style={styles.titleText}>Insert Info</Text>
              </View>
              <View style={{ flex: 2, paddingBottom: 60 }}>
                <FormLabel>Title</FormLabel>
                <FormInput
                  ref={ref => this.InputTitle = ref}
                  onChangeText={(text) => this.setState({title: text})}/>
                <FormValidationMessage>{this.state.error.title}</FormValidationMessage>
                <FormLabel>Body</FormLabel>
                <FormInput
                  ref={ref => this.InputBody = ref}
                  onChangeText={(text) => this.setState({body: text})}/>
                <FormValidationMessage>{this.state.error.body}</FormValidationMessage>
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
