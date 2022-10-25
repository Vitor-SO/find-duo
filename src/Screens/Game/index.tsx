import {
  View,TouchableOpacity,Image, ScrollView, FlatList,Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '../../Components/Background';
import {useRoute,useNavigation} from '@react-navigation/native'
import { GameParams } from '../../@types/navigation';
import { styles } from './styles';
import {Entypo} from '@expo/vector-icons'
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../Components/Heading';
import { DuoCard, IDuoCardProps } from '../../Components/DuoCard';
import { useEffect, useState } from 'react';
import { AdsByGame } from '../../Apollo/Queries/AdsByGame';
import { useQuery } from '@apollo/client';
import tw from 'twrnc'




export interface IAdsByGameQuery{
  adsByGame: IDuoCardProps[];
}

export default function Game(){
  //this is used to get params of "page"
  const route = useRoute()
  const game = route.params as GameParams
  const navigation = useNavigation()
  const [duos,setDuos] = useState<IDuoCardProps[]>([])

  function handleGoBack(){
    navigation.goBack()
  }

  //get data of adsByGame
  const {error, data} = useQuery<IAdsByGameQuery>(AdsByGame,{
    variables:{
      "id": game.id,
    }
  } )
  useEffect(() => {
    if(data?.adsByGame){
      setDuos(data?.adsByGame)
    }else{
      console.log(error);
    }
  }, [data])
  

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Entypo
          name='chevron-thin-left'
          color={THEME.COLORS.CAPTION_300}
          size={20}
          />

        </TouchableOpacity>
          <Image source={logoImg} style={styles.logo}/>

        <View style={styles.right}/>
      </View>

      <Image
      source={{uri: game.bannerUrl}}
      style={styles.cover}
      resizeMode="cover"
      />

      <Heading title={game.title} subtitle='Conecte-se e comece a jogar!'/>

      <FlatList
        data={duos}
        keyExtractor={(item) => item?.id}
        renderItem={({item})=>(
          <ScrollView >
          <DuoCard data={item} onConnect={()=> {}}/>
        </ScrollView>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[ duos.length > 0 ? tw`pl-[32px] pr-[64px]` : {flex: 1, alignItems: 'center', justifyContent: 'center'}]}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Não existe anúncios ainda.
          </Text>
        )}
      />
   
    </SafeAreaView>
    </Background>
  );
}