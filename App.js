import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, TextInput, Pressable, TouchableHighlight, Modal, ScrollView, 
  Text, View, ImageBackground, TouchableOpacity, Picker, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Aclonica_400Regular} from '@expo-google-fonts/aclonica';
import React, {useState, useEffect} from 'react';
import Contador from './Contador';
//import { AntDesign } from '@expo/vector-icons';

export default function App() {
  
  const [estado, setarEstado] = useState('selecionar');
  const [segundos, setarSegundos] = useState(1);
  const [minutos, setarMinutos] = useState(0);
 
  const [alarmeSound, setarAlarmeSound] = useState([
    {
      id:1,
      selecionado:true, 
      som:'Alarme 1',
      file: require('./assets/alarme1.mp3')
    },
    {
      id:2,
      selecionado:false, 
      som:'Alarme 2',
      file: require('./assets/alarme2.mp3')
    },
    {
      id:3,
      selecionado:false, 
      som:'Alarme 3',
      file: require('./assets/alarme3.mp3')
    },
  ]);

 
  function setarAlarme(id){
    let alarmesTemp = alarmeSound.map(function(val){
      if(id != val.id)  
        val.selecionado = false;
      else
        val.selecionado = true;
      return val;
    })

    setarAlarmeSound(alarmesTemp);
  }

  if(estado == 'selecionar'){
  return (
    <View style={styles.container} >
      <LinearGradient
        colors={['rgba(201, 42, 114, 1)', 'rgba(232, 126, 25, 0.9)']}
        style={{
          position:'absolute',
          left:0,
          right:0,
          top:0,
          height:'100%',
        }}
      />
      <StatusBar style="auto" />

      <View>
        <Text style={{color:'rgba(106, 156, 153, 1)',backgroundColor:'rgba(157, 252, 246, 1)', fontFamily:'Aclonica_400Regular', fontSize:50}}>Selecione o Tempo</Text>
      </View>  

      <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'rgba(0,60,19,0.6)', padding:15}}>
        
          <Text>Min:</Text>
          <TextInput 
            onChangeText={setarMinutos} 
            value={minutos} 
            style={{width:40, backgroundColor:('rgba(0,0,0,0.6)'), textAlign:'center', marginRight:10}}
          ></TextInput>
        
          <Text>Seg:</Text>
          <TextInput 
            onChangeText={setarSegundos} 
            value={segundos} 
            style={{width:40, backgroundColor:('rgba(0,0,0,0.6)'), textAlign:'center'}}
          ></TextInput>
        
      </View>

      <View style={{flexDirection:'row'}}>
        {
        alarmeSound.map(function(val){
          if(val.selecionado){
            return(
              <TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.bntSoundAlarmSelecionado}>
                <Text style={{color:'white', fontSize:18}}>{val.som}</Text>
              </TouchableOpacity>
            );
          }else{
            return(
              <TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.bntSoundAlarm}>
                  <Text style={{color:'white', fontSize:18}}>{val.som}</Text>
              </TouchableOpacity>
            );
          }
        })
        }
      </View>

      <TouchableOpacity onPress={()=>setarEstado('iniciar')} style={styles.btnIniciar}>
        <LinearGradient
          colors={['rgba(232, 126, 25, 0.9)', 'rgba(201, 42, 114, 1)']}
          style={{
            position:'absolute',
            left:0,
            right:0,
            top:0,
            borderRadius:50,
            height:'100%',
            zIndex:1
          }}
        />
        <Text style={{textAlign:'center', marginTop: 30, fontSize:22, color:'white', zIndex:2}}>INICIAR</Text>
      </TouchableOpacity>
    </View>
  );
  }else if(estado == 'iniciar'){
    return(
      <Contador 
        alarmes={alarmeSound} 
        setarMinutos={setarMinutos} 
        setarSegundos={setarSegundos} 
        setarEstado={setarEstado} 
        minutos={minutos} 
        segundos={segundos}
      ></Contador>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  btnIniciar: {
    width:100,
    height:100,
    borderRadius:50,
    borderColor:'white',
    borderWidth:2,
    marginTop:30,
  },
  bntSoundAlarm: {
    padding:8,
    marginRight:20,
    marginTop:15,
    backgroundColor:'rgba(0, 0, 0, 0.3)',
    borderColor:'rgba(0,0,0,0.5)',
    borderWidth:1,
  },
  bntSoundAlarmSelecionado: {
    padding:8,
    marginRight:20,
    marginTop:15,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    borderColor:'rgba(0,0,0,0.5)',
    borderWidth:1,
  },
});


