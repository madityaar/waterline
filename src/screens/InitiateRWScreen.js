import React, {useState} from 'react'
import {View, Text, StyleSheet,TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView, LogBox} from 'react-native'
import { FlatList } from "react-native-gesture-handler";
import BoxComponent from '../components/BoxComponent';







const  InitiateRWScreen= ({navigation}) =>{
    // var RW = {name:'', depthSumur:0, RTs:[]}
    // var RT = {name:'', numKK: 0, longPipe:0}
    const [input, setInput] = useState(null)
    const [results, setResults] = useState({RWs:[]})

    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'])

    const countRW = (qty) => {
        var RWs = []
        for (var i = 1; i < parseInt(qty)+1; i++) {
            const name = 'RW'+i
            var RW = {name: name, depthSumur:0, RTs:[]}
            RWs = [...RWs, RW]
        }
        return RWs;
    };
    
    const renderBox = (arrayofRW) =>{
        return  <View style={styles.parentBoxes}>
                <ScrollView  style= {{borderWidth:3, height:400 }}><FlatList 
                    showVerticalScrollIndicator = {false}
                    keyExtractor = {RW => RW.name}
                    data = {arrayofRW}
                    renderItem={ ({item}) => {
                        return <BoxComponent namaRW={item.name} payload={item.RTs.length} depthSumur={item.depthSumur} navigation={navigation} results={results} onBack={onBack}/>
                    }}/>
                </ScrollView><TouchableOpacity style={styles.buttonHarga} onPress={()=>navigation.navigate('Calc',{data:{results}})}><Text>Kalkulasi Harga</Text></TouchableOpacity></View>;
    }

    const onBack = (navigation,data)=>{
        navigation.goBack()
        setResults({RWs:data})
    }


    return <View style={styles.mainMenu}>
            <Text>Jumlah RW: </Text>
            <TextInput keyboardType='numeric' maxLength={2} style={styles.inputStyle} placeholder='jumlah RW' onChangeText={(text) => setInput(isNaN(text)? Alert.alert('error','Hanya Masukan Angka',[{text:'Mengerti'}]): text )}/>
            <TouchableOpacity style={styles.componentButton} onPress={() => setResults({RWs: countRW(input)})}><Text>Proses RW</Text></TouchableOpacity>
            {renderBox(results.RWs)}
            <View></View>
        </View>;
};




const styles = StyleSheet.create({
    mainMenu:{
        alignItems:'flex-start',
        flex:1,
        borderWidth:1,
        borderWidth:3
    },
    inputStyle:{
        height:100,
        marginHorizontal:15,
        borderWidth:1,
        marginVertical:20
    },
    componentButton:{
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius:50,
        marginHorizontal:20,
        marginVertical: 20
    },
    parentBoxes:{
        marginVertical:20,
        height:400,
        alignSelf:'center'
    },
    buttonHarga:{
        alignSelf:'flex-end',
        backgroundColor: "#DDDDDD",
        alignItems:'center',
        padding:15,
        marginHorizontal:25

    }
});

export default InitiateRWScreen;