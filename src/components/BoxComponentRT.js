import React from 'react'
import {View, Text, StyleSheet,TouchableOpacity } from 'react-native'
//import * as Progress from 'react-native-progress'


const BoxComponentRT= ({namaRT, payload, longPipe, whenPressed, dataPressed}) =>{
    const onSelected = () => {
        whenPressed()
        dataPressed()
        return;
    }

    return <View>
        <TouchableOpacity style={styles.box} onPress={() => onSelected()}>
            <Text>{namaRT}</Text>
            <Text>Jumlah KK: {payload}</Text>
            <Text>Jarak Pipa Tampungan Ke RT: {longPipe}</Text>
            {/* <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}
        
        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({
    box:{
        width:250,
        height:100,
        borderWidth:3,
        backgroundColor:'white',
        alignItems:"center",
        justifyContent:"center",
        marginVertical:10,
        marginHorizontal:20,
        borderRadius:15,
        borderColor:'red',
        display:'flex',
        alignSelf:'stretch'
    }
});

export default BoxComponentRT;