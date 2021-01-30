import React from 'react'
import {View, StyleSheet, 
  Text, TouchableOpacity, ScrollView} from 'react-native'

const Details = (props:any) => {
  const myMenu = [
    {title: 'Duración', description: ['Descripcion']},
    {title: 'Fecha de estreno', description: ['Descripcion'] },
    {title: 'Calificación', description: ['Descripcion']}
    {title: 'Generos' , }

  ]
  return (
    <View style={styles.container}>
      <View style={styles.blockScreen}>
      </View>
      <ScrollView>
        <View style={styles.image}>
        </View>
        <View style={{padding:15}}>
          <Text style={{fontSize:25, 
                        color: 'white',
                        fontWeight: 'bold',
                        marginBottom: 15}}>
            Title
          </Text>
          
          
        </View>
      </ScrollView>
    </View>
  )

}

export default Details
const styles= StyleSheet.create({
  container:{
    position: 'absolute',
    flex:1,
    width:'107%',
    height: '107%'
  },
  blockScreen:{
    width: '100%',
    height: '100%',
    backgroundColor:'black',
    position: 'absolute',
    opacity: .8
  },
  image:{
    width: '100%',
    height: 350,
    backgroundColor: 'red'
  },
  myTitle:{
    fontSize:15,
    color: 'white',
    fontWeight: 'bold'
  },
  myDescription:{
    color:'white',
    fontSize: 15,
    marginBottom:10
  }
}) 
