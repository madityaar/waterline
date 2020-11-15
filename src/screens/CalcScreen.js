import React, {useState} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import spreadsheet from '../api/spreadsheet.js'
import ComponentHarga from '../components/ComponentHarga'

const CalcScreen = ({navigation}) =>{

    var Restemp={
        "RWs":  [
           {
            "RTs":  [
               {
                "longPipe": "2",
                "name": "RT1",
                "payload": "55",
              },
               {
                "longPipe": "8",
                "name": "RT2",
                "payload": "33",
              },
            ],
            "depthSumur": "2",
            "name": "RW1",
          },
           {
            "RTs":  [
               {
                "longPipe": "3",
                "name": "RT1",
                "payload": "55",
              },
              {
                "longPipe": "8",
                "name": "RT2",
                "payload": "22",
              },
            ],
            "depthSumur": "55",
            "name": "RW2",
          },
        ],
      }


    const [dbMisc, setdbMisc] = useState(null)
    const [dbPipa, setdbPipa] = useState(null)
    const [dbTampungan, setdbTampungan] = useState(null)
    const [hargaDisplay, sethargaDisplay] = useState(0)
    const [results, setResults] =useState(navigation.state.params.data.results)
    
    const KEY_MISC = '1Xa2kVTiN60Nn-BFhXOOBycakyZzzGVWlLj1N63eIm4o/'
    const KEY_PIPA = '1JLLONICymFRRrEQTC-LsA5QqwMak4iNDzNF5AlbJ21Q/'
    const KEY_TAMPUNGAN = '1jUaU7p57lpyCzmduv8ZLQUPECjAuPLiGWzX80JwzJzI/'
    const END_TERM = 'od6/public/values?alt=json'
    
    const readAPI = async ()=>{
         const [response1,response2,response3] = await Promise.all([
             spreadsheet.get(KEY_MISC+END_TERM),
             spreadsheet.get(KEY_PIPA+END_TERM),
             spreadsheet.get(KEY_TAMPUNGAN+END_TERM)
        ])
        setdbMisc(readJSON(response1.data.feed.entry,3))
        setdbPipa(readJSON(response2.data.feed.entry,5))
        setdbTampungan(readJSON(response3.data.feed.entry,5))
    }

    const readJSON = (data,numColumn)=>{
        var result =[]

        result = data.map((item, index) =>{
            return item.content.$t
        })

        const newArr = [];
        while(result.length) newArr.push(result.splice(0,numColumn));
        newArr.shift()
        return newArr;
    }


    const setRule = (dataPipa, dataTampungan, dataMisc) =>{
        var pipa = []
        var rTampungan = []
        var hargaPipa =[]
        var hargaTampungan =[]
        var hargaMisc =[]

        
        pipa = dataPipa.map((item, index) =>{
            return parseInt(item[2])
        })
        rTampungan = dataTampungan.map((item, index) =>{
            return parseInt(item[2])
        })

        hargaPipa = dataPipa.map((item, index) =>{
            return parseInt(item[3])
        })

        hargaTampungan = dataTampungan.map((item, index) =>{
            return parseInt(item[3])
        })

        hargaMisc = dataMisc.map((item, index) =>{
            return parseInt(item[1])
        })

        var arrHarga =  [];
        arrHarga.push(hargaMisc[0])
        arrHarga.push(hargaPipa)
        arrHarga.push(hargaTampungan)
        arrHarga.push(hargaMisc[1])
        var hargaPipaBor = 1000
        return [pipa, rTampungan, arrHarga, hargaPipaBor];
     }

    const ruleofThumb= (RW,pipa,arrHarga) => {
        
        var hargaPipa = []
        var hargaTampungan = []
        var totkk=0
        var i = 0
        //console.log(RW.RTs)
        for (var i in RW.RTs) {totkk=totkk+parseInt(RW.RTs[i].payload)};
        console.log('totkk',totkk)
        if (totkk < pipa[0]){
            hargaPipa.push(arrHarga[1][0])
            hargaTampungan.push(arrHarga[2][0])
        }else if (totkk < pipa[1]){
            hargaPipa.push(arrHarga[1][1])
            hargaTampungan.push(arrHarga[2][1])
        }
        else{
            hargaPipa.push(arrHarga[1][2])
            hargaTampungan.push(arrHarga[2][2])
            }
        for (var i in RW.RTs){
            if (parseInt(RW.RTs[i].payload) < pipa[0]){
            hargaPipa.push(arrHarga[1][0])
            hargaTampungan.push(arrHarga[2][0])
            }else if (parseInt(RW.RTs[i].payload) < pipa[1]){
                hargaPipa.push(arrHarga[1][1])
                hargaTampungan.push(arrHarga[2][1])
            }
            else{
                hargaPipa.push(arrHarga[1][2])
                hargaTampungan.push(arrHarga[2][2])
            }
        }

        return [hargaPipa, hargaTampungan]
    }

    const pengeboran = (RW,arrHarga,hargapipabor)=>{
        return parseInt(RW.depthSumur)*arrHarga[0] + parseInt(RW.depthSumur)*hargapipabor
    }
    const pompa=(arrHarga)=>{
    return arrHarga[3]}

    const hargaPipaTampungan=(hargaPipa,RW)=>{
    var hargaPipaTot=0
    var i=1
    for (var j in RW.RTs){
        hargaPipaTot = hargaPipaTot + parseInt(RW.RTs[j].longPipe)*hargaPipa[i]
        i=i+1
    }
    return hargaPipaTot}


    const tampungan =(hargaTampungan)=>{
        return hargaTampungan.reduce((a, b) => a + b, 0)
    }
    const totalBiaya=(RW,pipa,arrHarga,hargapipabor)=>{
        //console.log(RW)
        var hargaPipa =[]
        var hargaTampungan=[]
        var value =[]
        value = ruleofThumb(RW,pipa,arrHarga)
        hargaPipa = value[0]
        hargaTampungan = value[1]
        //console.log(pengeboran(RW,arrHarga,hargapipabor),pompa(arrHarga),hargaPipaTampungan(hargaPipa,RW),tampungan(hargaTampungan))
        return pengeboran(RW,arrHarga,hargapipabor)+pompa(arrHarga)+hargaPipaTampungan(hargaPipa,RW)+tampungan(hargaTampungan) 
    }

    const Calculate = (RWs,dbTampungan,dbPipa,dbMisc) =>{
        var totalBiayaPipanisasi=[]
        var pipa =[]
        var rTampungan=[]
        var arrHarga=[]
        var hargaPipaBor=[]
        for ( var i in RWs){
            pipa =[]
            rTampungan=[]
            arrHarga=[]
            hargaPipaBor=[]
            var value=null
            value=setRule(dbPipa,dbTampungan,dbMisc)
            pipa =value[0]
            rTampungan = value[1]
            arrHarga = value[2]
            hargaPipaBor= value[3]
            //console.log(setRule(dbPipa,dbTampungan,dbMisc))
            //console.log(pipa, rTampungan, arrHarga, hargaPipaBor)
            totalBiayaPipanisasi.push(totalBiaya(RWs[i],pipa,arrHarga,hargaPipaBor))
        }
        return totalBiayaPipanisasi
    }

    const renderMoney = (arr) =>{
        return <View><Text>DetailPerRW:</Text>
            <FlatList 
                showVerticalScrollIndicator = {false}
                scrollEnabled={true}
                keyExtractor = {data => data}
                data = {arr}
                renderItem={ ({item, index}) => {
                    return <View>
                    <Text>RW{index+1}: Rp{item}</Text>
                    </View>}
                }/>
            </View>
    }

    // const renderDetail=(array) =>{
    //     var display = ''
    //     for (var i in array){
    //         display = display+`RW${i}: Rp${array[i]}`
    //     }
        
    //     return display;
    // }


    return <View>
        <TouchableOpacity style={styles.button} onPress={()=> readAPI()}><Text>Tekan Disini</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> sethargaDisplay(Calculate(results.RWs,dbTampungan,dbPipa,dbMisc))}><Text>Hitung</Text></TouchableOpacity>
        
        <View style={styles.containerHarga}><Text>{hargaDisplay!=0?renderMoney(hargaDisplay):0}</Text></View>
        <View style={styles.containerHarga}><Text>Harga: Rp{hargaDisplay!=0?hargaDisplay.reduce((a,b)=>a+b,0):0}</Text></View>
        
        </View>
}


const styles = StyleSheet.create({
    button:{
        borderWidth:3,
        marginVertical:15,
        marginHorizontal:30,
        height:150,
        alignItems:'center',
        justifyContent:'center'
    },
    containerHarga:{
        borderWidth:3,
        alignItems:'flex-start',
        alignSelf:'center',
        padding:30,
        marginVertical:15
    }
})

export default CalcScreen;