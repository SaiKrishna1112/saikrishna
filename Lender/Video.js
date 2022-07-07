import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';

export default class BackgroundVideo extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Video
          source={{uri:'https://www.youtube.com/watch?v=BVPXAIRm7Ck&list=PLTDgOUcX23hbmAATluQUP3aZwSXQa01GJ&index=12&ab_channel=FreeVideoBackgroundloops'}}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode={"cover"}
          repeat
          style={styles.video}
        />

        <View style={styles.content}>
          <Text style={styles.text}>Hello</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
