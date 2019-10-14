import {
    StyleSheet,
  } from 'react-native';
  
  export const base = {
    container: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: 80,
      paddingBottom: 15,
      paddingRight: 15,
      paddingLeft: 15
    },
    text: {
      color: '#ffffff',
      fontWeight: 'bold'
    }
  }
  
  export default {
    editSuccess: StyleSheet.create({
      container: StyleSheet.flatten([base.container, { backgroundColor: '#4a90e2' }]),
      text: base.text
    }),
    editFail: StyleSheet.create({
      container: StyleSheet.flatten([base.container, { backgroundColor: '#d83a49' }]),
      text: base.text
    })
  }