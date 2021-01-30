import React,{useEffect, useState} from 'react'
import {View, StyleSheet,Text, 
        ScrollView, ImageBackground, 
        ActivityIndicator, TouchableOpacity,
        RefreshControl} from 'react-native'
import baseUrl from '../../Config/baseUrl'
import { Feather } from '@expo/vector-icons';
import Details from './Components/Details'
const HomePage = () => {
  const [page, setPage] = useState(1)
  const [elements, setElements] = useState([]) 
  const [name, setName] = useState(false) 
  const [loading, setLoading] = useState(false)
  const [stopLoop, setStopLoop] = useState([])
  const [refresh, setRefresh] = useState(false)
  useEffect(()=>{
    obtenerPeliculas()
  },[stopLoop])

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
      .catch((error)=>{
        return {results:[]}
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
  const onRefresh= async() =>{
    setPage(0)
    setRefresh(true)
    setElements([])
    await obtenerPeliculas()
    setRefresh(false)
  }
  const showLoadingScroll = () =>{
      return(
        <View style={{width: '100%',
                      alignItems: 'center'}}>
          <ActivityIndicator size='small' color='white'/>
        </View>
      )
  }
  const close = ()=>{
    setName(false)
  }
  const getDetailsMovie = async(id:number) => {
    if(name == false){
      const detailsUrl =`https://api.themoviedb.org/3/movie/${id}?api_key=634b49e294bd1ff87914e7b9d014daed&language=en-US`
      const getData = await fetch(detailsUrl, {
      method: 'GET'
      })
      .then((response)=>{
        return response.json()
      })
      .catch((error)=>{
        return false
      })
    setName(getData)
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
      }}
    refreshControl={
      <RefreshControl
        refreshing={refresh}
        onRefresh={onRefresh}
      />
    }>
        <Elements
          movies={elements}
          getDetailsMovie={getDetailsMovie}
        />
        {showLoadingScroll()}
      </ScrollView>
      {
        name == false
        ?
        null
        :
        <Details
          duracion={name.runtime}
          fecha={name.release_date}
          calificacion={name.vote_average}
          title={name.original_title} 
          generos={name.genres}
          descripcion={name.overview}
          portada={name.backdrop_path}
          close={close}
        />
      }
    </View>
  )

}

export default HomePage

const Elements =  (props:any) => {
  const url:string ='https://image.tmdb.org/t/p/w500' 
  

  return props.movies.map((data:any, index:number)=>{
   return(
     <TouchableOpacity 
     onPress={()=>{
        props.getDetailsMovie(data.id)
     }}
     style={{width: '45%', marginHorizontal: 5}}>
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
     </TouchableOpacity>
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
    width: '100%',
    height: 320,
    borderRadius: 15,
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
