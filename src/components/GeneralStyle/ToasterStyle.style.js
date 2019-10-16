import {
    StyleSheet,
} from 'react-native';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 2,

        left: 0,
        right: 0,
        elevation: 999, //Android shizz
        alignItems: 'center',
    },

    message:{
        backgroundColor: '#4a90e2',
        // backgroundColor: '#e24a4a',

        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: 100,
    }
});