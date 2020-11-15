import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


const ComponentHarga = (noRW, biaya) =>{
    return <View>
            <Text>RW {parseInt(noRW+1)} : {biaya}</Text>
        </View>
}

const styles = StyleSheet.create({

})

export default ComponentHarga;
