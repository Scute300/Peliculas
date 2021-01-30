import React,{useEffect, useState} from 'react'
import {View, StyleSheet,Text, ScrollView, ImageBackground, ActivityIndicator} from 'react-native'
import baseUrl from '../../Config/baseUrl'
import { Feather } from '@expo/vector-icons';
import Details from './Components/Details'
const HomePage = () => {
  const [page, setPage] = useState(1)
  const [elements, setElements] = useState([]) 
  const [name, setName] = useState(0) 
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    obtenerPeliculas()
  },[name])

  const obtenerPeliculas = async()=>{
    if(loading == false){
      setLoading(true)
      let newPage = page + 1
      setPage(newPage)
      const pet = 
      await fetch(baseUrl+page,{
      method: 'GET'
      })
      .then((response)=>{
        return response.json()
      })
      setElements(elements.concat(pet.results))
      setLoading(false)
    }
  }

  const finalScroll:any = ({layoutMeasurement, contentOffset, contentSize}) =>{
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
  }
  const details = () =>{
    if(name == 0){
      return <Details/>
    }
  }
  const showLoadingScroll = () =>{
    if(loading == true){
      return(
        <View style={{width: '100%',
                      alignItems: 'center'}}>
          <ActivityIndicator size='small' color='white'/>
        </View>
      )
    }
  }
  return(
    <View style={{flex:1}}>
      <ScrollView  
      style={{backgroundColor: '#1c1c1c'}}
      contentContainerStyle={styles.container}
      onScroll={({nativeEvent})=>{
        if(finalScroll(nativeEvent)){
          obtenerPeliculas()
        }
      }}>
        <Elements
          movies={elements}
        />
        {showLoadingScroll()}
      </ScrollView>
      {details()}
    </View>
  )

}

export default HomePage

const Elements =  (props:any) => {
  const url:string ='https://image.tmdb.org/t/p/w500'  
  return props.movies.map((data:any, index:number)=>{
   return(
    <View 
     style={styles.moviePreview}> 
     <ImageBackground 
      source={{uri:url+data.poster_path}} 
      style={{width: '100%', 
              height: '100%',
              justifyContent:'flex-end'}}>
     <View style={styles.previewDetailBox}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={styles.titleText}>
          {data.title}
          </Text>
        </View>
        <View style={{flex: 1, 
                    flexDirection: 'row'}}>
          <View style={{ flex:.7, justifyContent: 'flex-end'}}>
            <Text style={[styles.titleText,
                        {fontSize: 12}]}>
              {data.release_date}
            </Text>
          </View>
          <View style={{flex:.3, 
                      alignItems:'flex-end',
                      justifyContent: 'center',
                      flexDirection: 'row'}}>
            <View style={{bottom: 3}}>
              <Feather name="star" size={17} color="#ffb700" />
            </View>
            <Text style={[styles.titleText,
                        {fontSize: 13}]}>
              {data.vote_average} 
            </Text> 
          </View>
        </View>
      </View> 
     </View>
     </ImageBackground>
    </View>
   ) 
  })


}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    padding:10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent:'center',
  },
  scroll:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex:1
  },
  moviePreview:{
    width: '46%',
    height: 320,
    borderRadius: 20,
    margin: 5,
    overflow: 'hidden'
  },
  previewDetailBox:{
    width: '100%',
    height:'27%',
    backgroundColor: 'black',
    opacity: .5,
    flexDirection:'row',
    padding:5
  },
  titleText:{
    color: 'white',
    fontSize:13,
    fontWeight: 'bold'
  }
})
