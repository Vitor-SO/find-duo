import {
  Image,
  FlatList
} from 'react-native';
import {useEffect, useState} from 'react'
import tw from 'twrnc'
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard,IGameCardProps } from '../../Components/GameCard';
import { Heading } from '../../Components/Heading';
import {  useQuery } from '@apollo/client';
import { GAME } from '../../Apollo/Queries/Game';
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '../../Components/Background';
import {useNavigation} from "@react-navigation/native"

export interface IGameQuery {
  game: IGameCardProps[];
}


export default function Home(){
  const {data} = useQuery<IGameQuery>(GAME)
  const [dataGameQuery,setDataGameQuery] = useState<IGameCardProps[]>([])
  const navigation = useNavigation()


  function handleScreenGame({id,title,bannerUrl}:IGameCardProps){
    navigation.navigate("game",{id,title,bannerUrl})
  }

  useEffect(() => {
    if(data?.game){
      setDataGameQuery(data?.game)
    }else{
      console.log('carregando...');
      
    }

    
  }, [data])
  
  return (
    <Background>
    <SafeAreaView style={tw`flex-1 items-center `}>
      <Image style={tw`w-[214px] h-[100px] mt-[50px] mb-[30px]`} source={logoImg}/>
      <Heading title="Encontre seu duo" subtitle="selecione o game que deseja jogar..."/>
      <FlatList
        data={dataGameQuery}
        keyExtractor={(item) => item?.id}
        renderItem={({item})=>(
          <GameCard 
          data={item}
          onPress={()=> handleScreenGame(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pl-[32px] pr-[64px]`}
      />
    </SafeAreaView>
    </Background>
  );
}