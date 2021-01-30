import React from 'react'
import {View, StyleSheet, 
  Text, TouchableOpacity, ScrollView,
  ImageBackground} from 'react-native'

const Details = ({duracion, fecha, 
                  calificacion, generos, 
                  descripcion,title, 
                  portada, close}) => {
  const myMenu = [
    {title: 'Length', description: [{name: duracion+' mins'}]},
    {title: 'Release', description:[{name:fecha}]},
    {title: 'Qualification', description: [{name: calificacion}]},
    {title: 'Genre' , description: generos},
    {title: 'Description', description: [{name: descripcion}]}

  ]
  return (
    <View style={styles.container}>
      <View style={styles.blockScreen}>
      </View>
      <ScrollView>
        <View style={styles.image}>
          <ImageBackground 
          source={{uri:`https://image.tmdb.org/t/p/w500${portada}`}}
            style={{width: '100%', height: '100%'}}>
            <View style ={{width: '100%', alignItems:'flex-end', padding: 40}}>
                <TouchableOpacity onPress={()=>{close()}}>
                  <Text style={{fontSize:25, color: 'white', fontWeight: 'bold'}}>
                  X
                  </Text>
                </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={{padding:15}}>
          <Text style={{fontSize:25, 
                        color: 'white',
                        fontWeight: 'bold',
                        marginBottom: 15}}>
             {title}
          </Text>
            {
              myMenu.map((data, index)=>{
                return (
                  <View style={{width: '100%'}}>
                    <Text style={styles.myTitle}>
                      {data.title}
                    </Text>
                    <View style={{flexDirection: 'row', 
                          flewWrap: 'wrap', width:'100%'}}>
                    {
                    data.description.map((data, index)=>{
                        return (
                          <Text style={styles.myDescription}>
                          {data.name+' '}
                          </Text>                          
                        )
                      })
                    }
                    </View>
                  </View>
                )
              })
            }
          
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
    width:'102%',
    height: '100%'
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
    backgroundColor: 'black'
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
