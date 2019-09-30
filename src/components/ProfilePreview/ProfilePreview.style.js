import {
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({

    profileOverviewView:{
        flexDirection: 'row',
        borderColor: "lightgray",
        borderRadius: 5,
        borderWidth: 1.5,
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        alignItems: "center",
    },

    profileOverviewViewRight:{
        padding: 10,
        alignSelf: "flex-end",
    },

    textName:{
        fontWeight: '600',
    },

    textTitle:{
        color: 'gray',
    },

    previewImg:{
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: "center",
    }
});