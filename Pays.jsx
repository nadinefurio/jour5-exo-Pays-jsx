import { FlatList, StyleSheet, Text, TextInput, View, Image , Button } from 'react-native'
import React , {useState , useEffect} from 'react'


const Pays = () => {
    const [affiche , setAffiche] = useState("")
    const [filtres , setFiltres] = useState([]);

    useEffect(function(){
        setAffiche("all")
    }, [])
}

useEffect(function(){
    fetch("https://restcountries.com/v3.1/all")
    .then(reponse => reponse.json())
    .then(data => setFiltres(data.pays));
} , [])

useEffect(function() {
    fetch("https://restcountries.com/v3.1/="+ affiche)
    .then(reponse => reponse.json())
    .then(data => {
        if(Array.isArray(data.pays)){
            setFiltres(data.pays)
        }
    });
} , [affiche] )

    return (
        <View style={styles.box}>
        <View style={styles.search}>
        <TextInput
        placeholder='affiche'
        value={affiche}
        onChangeText={(nomPays) => {setAffiche(nomPays)}}
        style={styles.input}
        keyboardType='default' />
        <Button title="afficher" onPress={() => { console.log(affiche) }} />
        </View>

    <View style={styles.filtre}>
        { filtres.lenght === 0
            ?
        <Text>Filtrer le pays concerné</Text>
            :
        <FlatList
            data={filtres}
            renderItem={({item}) => <View style={styles.espace}>
                <Image source={{ uri : item.flags , width : "80%" , height : 250 }} />
                <Text style={styles.flag}>{item.flags}</Text>
                <Text style={styles.population}>{item.population}</Text>
                <Text style={styles.devise}>{item.currencies}</Text>
                <Text style={styles.symbole}>{item.symbol}</Text>
                </View> }
                keyExtractor={item => item.name}
        />
    } 
    </View>
</View>
)
    
export default Pays ;

const styles = StyleSheet.create({}) 
  {/** box : { paddingHorizontal : 20 },
    * search : { flexDirection : "row" },
    * input : { padding : 10, borderColor : blue ,  borderWidth : 1, marginRight : 20 },
    * filtre : { marginTop :20 },
    * espace : {marginBottom : 40 },
    * flag : { fontSize : 20 },
    * population : { fontSize : 20 },
    * devise : { fontSize : 20 },
    * symbole : { fontSize : 20 }
    */}


