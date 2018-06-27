import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TouchableOpacity, Dimensions, PermissionsAndroid, Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ARKit } from 'react-native-arkit';
import R from 'ramda';

import { Icon, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as anchorActions from '../actions/anchorActions';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    } else {
    }
  } catch (err) {
    console.warn(err)
  }
}

class AnchorScanner extends Component {
  constructor(props) {
    super(props);
    this.qrCodeReceived = this.qrCodeReceived.bind(this);
  }

  async componentWillMount() {
  }

  async qrCodeReceived(e) {
    const ownerId = await AsyncStorage.getItem('user_id')
    .then(doc => doc)
    .catch(err => err);
    const cameraStats = await ARKit.getCamera();
    console.log("camera stats: ", cameraStats);
    if (ownerId instanceof Error) {
      Alert('deu ruim');
    } else {
      this.props.actions.addAnchor({
        anchor: e.data,
        owner: ownerId
      });
    }

    // this.scanner.reactivate();
    Actions.pop();
  }

  _renderTopContent() {

  }

  _renderBottomContent() {
    return (
      <TouchableOpacity onPress={Actions.pop}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <QRCodeScanner
        ref={(node) => this.scanner = node}
        onRead={(e) => this.qrCodeReceived(e)}
        topContent={
          <Text style={styles.centerText}>
            AirNotes
          </Text>
        }
        bottomContent={this._renderBottomContent()}
        topViewStyle={{flex:0, height: 100, alignContent: 'flex-start'}}
        bottomViewStyle={{flex:1, height: 100}}
        checkAndroid6Permissions={false}
        permissionDialogMessage={"maoe"}
        cameraStyle={{
          flex:0,
          height: Dimensions.get('window').height - 200,
          width: Dimensions.get('window').width,
        }}
      />
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
  buttonSearch: {
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
    actions: bindActionCreators({...anchorActions}, dispatch)
  }))(AnchorScanner);
