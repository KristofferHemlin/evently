import {
    StyleSheet,
} from 'react-native';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 2,

        top: 0,
        left: 0,
        right: 0,
        elevation: 999, //Android shizz
        alignItems: 'center',
    },

    successMessage:{
        backgroundColor: '#4a90e2',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: 100,
    },

    errorMessage:{
        backgroundColor: '#e24a4a',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
        height: 100,
    }
});