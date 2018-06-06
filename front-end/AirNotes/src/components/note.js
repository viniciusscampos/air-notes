import React, { Component } from 'react';
import {  AppRegistry, Text, View, StyleSheet} from 'react-native';
import { ARKit } from 'react-native-arkit';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultProps: {
        color: '',
        position : {},
        note: ''
      }
    }
  }
  render() {
    const propsToUse = {
      ...this.state.defaultProps,
      ...this.props
    };
    return(
      <ARKit.Plane
        position={propsToUse.position}
        shape={{ width: .1, height: .1 }}
        material={{
          color: propsToUse.color,
        }}
      >
        <ARKit.Text
          text={propsToUse.note}
          position={{ x: 0.0, y: 0.0, z: 0 }}
          font={{ size: 0.01, depth: 0.01 }}
        />
      </ARKit.Plane>
    );
  }
}

const styles = StyleSheet.create({
});
export default Note;
