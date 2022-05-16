import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert, TextInput, Pressable, TouchableHighlight, Modal, ScrollView, 
  Text, View, ImageBackground, TouchableOpacity, Picker } from 'react-native';
//import { useFonts, Aclonica_400Regular } from '@expo-google-fonts/aclonica';
//import AppLoading from 'expo-app-loading';
import React, {useState, useEffect} from 'react';
//import { AntDesign } from '@expo/vector-icons';
 
export default function Contador(props) {
 
  var done = false;

  useEffect(()=>{

    const timer = setInterval(()=>{

      props.setarSegundos(props.segundos-1);
       
      if(props.segundos <= 0){
        if(props.minutos > 0){
          props.setarMinutos(minutos - 1);
          props.setarSegundos(59);
        }else {
          if(!done){
            done = true;
            props.setarEstado('selecionar');
            props.setarMinutos(0);
            props.setarSegundos(1);
            playSound();
          }
        }
      }      
    },1000)

    return () => clearInterval(timer);
  })

  async function playSound(){
    const sound = new Audio.Sound();
    try {
      var alarme;
      props.alarmes.map(function(val){
        if(val.selecionado){
          alarme = val.file;
        }
      })
      await sound.loadAsync(alarme );
      await sound.playAsync();
      // Your sound is playing!

      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      //await sound.unloadAsync();
    }catch (error) {
      // An error occurred!
    }
  }

  function resetar(){
    props.setarEstados('selecionar');
    props.setarMinutos(0);
    props.setarSegundos(1);
  }

  function formatarNumero(number){
    var finalNumber = '';
    if(number < 10){
      finalNumber = '0'+number;
    }else {
      finalNumber = number;
    }
    return finalNumber
  }

  var segundos = formatarNumero(props.segundos);
  var minutos = formatarNumero(props.minutos);
  
  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
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
      <View style={{flexDirection:'row'}}>
        <Text style={styles.textContador}>{minutos} : </Text>
        <Text style={styles.textContador}>{segundos}</Text>
      </View>

      
      <TouchableOpacity onPress={()=>resetar()} style={styles.btnIniciar}>
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
        <Text style={{textAlign:'center', marginTop: 30, fontSize:22, color:'white', zIndex:2}}>RESETAR</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  textContador: {
    color:'white',
    fontSize:70
  },
  btnIniciar: {
    width:100,
    height:100,
    borderRadius:50,
    borderColor:'white',
    borderWidth:2,
    marginTop:30,
  },
});