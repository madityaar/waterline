import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet,TextInput, TouchableOpacity, Alert, BackHandler, Button,ScrollView, Modal,LogBox } from 'react-native'
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import BoxComponentRT from '../components/BoxComponentRT';
import ModalComponent from '../components/ModalComponent';



const  InitiateRTScreen= ({navigation}) =>{
    const paramResult = navigation.state.params.data.results
    const paramIndex = navigation.state.params.namaRW
    var result =''
    var index = ''
    console.log(navigation.state.params.data.results)

    result == ''? result = paramResult : null;
    index == ''? index = parseInt(paramIndex)-1 : null;
    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.'])

    const [input, setInput] = useState(null)
    const [inputKK, setInputKK] = useState(null)
    const [inputPipa, setInputPipa] = useState(null)
    const [inputSumur, setInputSumur] = useState(null)
    const [results, setResults] = useState(result)
    const [modalVisible, setModalVisible] = useState(false);
    const indexRW = index
    const [indexRT,setIndexRT] = useState(null)
    //var indexRT = null
    
    const countRT = (qty,RWs,indexRW) => {
        var RTs = []
        for (var i = 1; i < parseInt(qty)+1; i++) {
            const name = 'RT'+i
            var RT = {name: name, payload:0, longPipe:0}
            RTs = [...RTs, RT]
        }
        RWs[indexRW].RTs=RTs
        return RWs;
    };

    //navigation.state.params.onBack(results.RWs);
    //navigation.goBack();
    
    
    const renderBox = (arrayofRT) =>{
        
        return  <View style={styles.parentBoxes}>
                <ScrollView nestedScrollEnabled style= {{borderWidth:3, height:400 }}><FlatList 
                    showVerticalScrollIndicator = {true}
                    scrollEnabled={true}
                    keyExtractor = {RT => RT.name}
                    data = {arrayofRT}
                    renderItem={ ({item}) => {
                        return <BoxComponentRT namaRT={item.name} payload={item.payload} longPipe={item.longPipe} whenPressed={()=>setModalVisible(true) } dataPressed = {() => setIndexRT(item.name.replace(/\D/g, "")-1)}/>
                    }}/>
                </ScrollView></View>;
    }

    const onSubmitModal =(RWs) =>{
        setModalVisible(!modalVisible)
        console.log(indexRT)
        RWs[indexRW].RTs[indexRT].payload=inputKK!=null?inputKK:0
        RWs[indexRW].RTs[indexRT].longPipe=inputPipa!=null?inputPipa:0
        setResults({RWs: RWs})
        
        return;
    }

    const submitKedalaman = (inputSumur, RWs,indexRW) =>{
        RWs[indexRW].depthSumur = inputSumur
        return RWs
    }
    return <ScrollView nestedScrollEnabled ><View style={styles.mainMenu}>
            
            <Text>Jumlah RT: </Text>
            <TextInput 
                keyboardType='numeric' 
                maxLength={2} 
                style={styles.inputStyle} 
                placeholder='jumlah RT' 
                onChangeText={(text) => setInput(isNaN(text)? Alert.alert('error','Hanya Masukan Angka',[{text:'Mengerti'}]): text )}
            />
            <TouchableOpacity style={styles.componentButton} onPress={() => setResults({RWs:countRT(input,result.RWs,indexRW)})}><Text>Proses Jumlah RT</Text></TouchableOpacity>
            <Text>Kedalaman Sumur: </Text>
            <TextInput 
                keyboardType='numeric' 
                maxLength={2} 
                style={styles.inputStyle} 
                placeholder='kedalaman sumur (m)' 
                onChangeText={(text) => setInputSumur(isNaN(text)? Alert.alert('error','Hanya Masukan Angka',[{text:'Mengerti'}]): text )}
            />

            <TouchableOpacity style={styles.componentButton} onPress={() => setResults({RWs:submitKedalaman(inputSumur,result.RWs,indexRW)})}><Text>Submit Kedalaman Sumur RW</Text></TouchableOpacity>
            {renderBox(results.RWs[indexRW].RTs)}
            <View></View>
            <View style={stylesModal.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >   
                    <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>
                        <View><Text style={stylesModal.modalText}>Jumlah KK:</Text>
                        <TextInput 
                            keyboardType='numeric' 
                            maxLength={4} 
                            style={styles.inputStyle} 
                            placeholder='Jumlah KK pada RT' 
                            onChangeText={(text) => setInputKK(isNaN(text)? Alert.alert('error','Hanya Masukan Angka',[{text:'Mengerti'}]): text )}
                        />
                        </View>
                        <View><Text style={stylesModal.modalText}>Jarak Pipa Tampungan Ke RT:</Text>
                        <TextInput 
                            keyboardType='numeric' 
                            style={styles.inputStyle} 
                            placeholder='Jarak Pipa (m)' 
                            onChangeText={(text) => setInputPipa(isNaN(text)? Alert.alert('error','Hanya Masukan Angka',[{text:'Mengerti'}]): text )}
                        />
                        </View>
                        <TouchableOpacity
                        style={{ ...stylesModal.openButton, backgroundColor: "#2196F3" }}
                        onPress={() => {
                            onSubmitModal(results.RWs);
                        }}
                        >
                        <Text style={stylesModal.textStyle}>Submit Perubahan</Text>
                    </TouchableOpacity>
                    </View>

                    </View>
                </Modal>
            </View>
        </View>
        </ScrollView>;
};

const styles = StyleSheet.create({
    mainMenu:{
        alignItems:'flex-start',
        borderWidth:1,
        borderWidth:3
    },
    inputStyle:{
        height:100,
        marginHorizontal:15,
        borderWidth:1,
        marginVertical:10
    },
    componentButton:{
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius:50,
        marginHorizontal:20,
        marginVertical: 20
    },
    boxRT:{
        width:100,
        height:100, 
        backgroundColor:'blue'
    },
    parentBoxes:{
        marginVertical:20,
        height:400,
        alignSelf:'center'
    }
    
});

const stylesModal = StyleSheet.create({
    centeredView: {
        alignSelf:'center',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
    },
    openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
    },
    textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
    },
    modalText: {
    textAlign: "center"
    }
    
});

export default InitiateRTScreen;