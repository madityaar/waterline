import React from 'react'
import {View, Text, StyleSheet,TouchableOpacity } from 'react-native'
//import * as Progress from 'react-native-progress'


const BoxComponent= ({namaRW, payload, depthSumur, navigation, results, onBack}) =>{
    

    return <View><TouchableOpacity style={styles.box} onPress={() => navigation.navigate('InitiateRT', {data:{results},namaRW:namaRW.replace(/\D/g, ""),onBack:onBack,name:namaRW})}>
        <Text>{namaRW}</Text>
        <Text>Jumlah RT {payload}</Text>
        <Text>Kedalaman Sumur Max: {depthSumur}</Text>
        {/* <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}

        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({
    box:{
        width:200,
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

export default BoxComponent;