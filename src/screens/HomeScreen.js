import React from 'react'
import {View, Text, StyleSheet, TextInput, Button} from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler'



const HomeScreen = ({navigation}) => {
    const display =
    <View >
        <View styles={styles.backgroundHome}>
            <Text style={styles.textTitle}>Apakah anda ingin menghitung</Text>
            <Text style={styles.textTitle}>biaya pipanisasi?</Text>
        </View>
        <View >
            <Button styles={styles.konfirmButton} title="Ya" onPress={() => navigation.navigate('InitiateRW')}/>
        </View>
    </View> 
    
    return display;
};

const styles = StyleSheet.create({
    textTitle:{
        alignSelf:'center',
        fontSize:20
    },
    textButton:{
        fontSize:30,
        color:'red'
    },
    konfirmButton:{
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    }
});


export default HomeScreen;