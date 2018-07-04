import React, { Component } from 'react';
import {  AppRegistry, Text, View, StyleSheet} from 'react-native';
import { ARKit } from 'react-native-arkit';
import R from 'ramda';

const mapIndexed = R.addIndex(R.map);

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultProps: {
        color: '',
        position : {},
        rotation: {},
        title: '',
        body: ''
      }
    }
  }
  _renderbody(body) {
    let lines = [];
    let pIndex = 0;
    const rBody = body;
    const bodyArray = rBody.split("");
    if (body.length > 30) {
      while(pIndex < body.length) {
        const endLine = Math.min(pIndex +29, body.length);
        const bodySlice = body.substring(pIndex, endLine);
        let added = false;
        if (endLine - pIndex < 29) {
          lines.push(body.substring(pIndex, endLine));
          break;
        }
        for (var i = pIndex+29; i > pIndex; i--) {
          if (bodyArray[i+1] == " " && bodyArray[i] != " ") {
            lines.push(body.substring(pIndex, i))
            pIndex = i+1;
            added = true;
            break;
          } else if (bodyArray[i] == " ") {
            lines.push(body.substring(pIndex, i+1))
            pIndex = i+1;
            added = true;
            break;
          }
        }
        if (!added) {
          lines.push(body.substring(pIndex, endLine));
          pIndex += 29;
        }
      }
    } else {
      lines.push(body);
    }
    return mapIndexed((line, i) => {
      return (
        <ARKit.Text
          key={i}
          text={line}
          position={{ x: 0.0, y: 0.01 - i* 0.01, z: 0 }}
          font={{ size: 0.005, depth: 0.0001 }}
        />
    )}, lines);
  }

  render() {
    const propsToUse = {
      ...this.state.defaultProps,
      ...this.props
    };
    return (
      <ARKit.Plane
        position={propsToUse.position}
        rotation={propsToUse.rotation}
        shape={{ width: .1, height: .1}}
        material={{
          color: '#f1d161'
        }}
      >
        <ARKit.Text
          text={propsToUse.title}
          position={{ x: 0.0, y: 0.03, z: 0 }}
          font={{ size: 0.01, depth: 0.0001 }}
        />
        {this._renderbody(propsToUse.body)}
      </ARKit.Plane>
    );
  }
}

const styles = StyleSheet.create({
});
export default Note;
