import { StyleSheet, Dimensions } from 'react-native';
const win =  Dimensions.get('window');

export default styles = StyleSheet.create({
    eventDescContainer:{
        flex: 1, 
    },
    bodyContainer:{
        flex: 9,
        backgroundColor: 'red',
        justifyContent: 'flex-start',
    }, 
    imgContainer:{
        flex: 1,
        backgroundColor: 'black',
        height: 200,
    },
    eventImg:{
        flex: 0,
        alignSelf: 'stretch',
        width: win.width,
    }, 
  });
