/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */
/* 
 'use strict';

 import React from 'react';
 import {StyleSheet, Text, View, Alert} from 'react-native';
 import Geolocation from '@react-native-community/geolocation';
 
 export default class GeolocationExample extends React.Component {
   state = {
     initialPosition: 'unknown',
     lastPosition: 'unknown',
   };
 
   watchID = null;
 
   componentDidMount() {
     Geolocation.getCurrentPosition(
       position => {
         const initialPosition = JSON.stringify(position);
         this.setState({initialPosition});
       },
       error => Alert.alert('Error', JSON.stringify(error)),
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
     );
     this.watchID = Geolocation.watchPosition(position => {
       const lastPosition = JSON.stringify(position);
       this.setState({lastPosition});
     });
   }
 
   componentWillUnmount() {
     this.watchID != null && Geolocation.clearWatch(this.watchID);
   }
 
   render() {
     return (
       <View>
         <Text>
           <Text style={styles.title}>Initial position: </Text>
           {this.state.initialPosition}
         </Text>
         <Text>
           <Text style={styles.title}>Current position: </Text>
           {this.state.lastPosition}
         </Text>
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   title: {
     fontWeight: '500',
   },
 }); */