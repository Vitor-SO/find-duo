import {
  Image,
  Text,
  View,
  FlatList
} from 'react-native';
import {useEffect, useState} from 'react'
import tw from 'twrnc'
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard,IGameCardProps } from '../../Components/GameCard';
import { Heading } from '../../Components/Heading';
import {GAMES} from '../../utils/games'
import { useQuery } from '@apollo/client';
import { GAME } from '../../Apollo/Queries/Game';

export interface IGameQuery {
  game: IGameCardProps[];
}


export default function Home(){
  const {error,data} = useQuery<IGameQuery>(GAME)
  const [dataGameQuery,setDataGameQuery] = useState<IGameCardProps[]>([])
  useEffect(() => {
    if(data?.game){
      setDataGameQuery(data?.game)
    }else{
      console.log(error);
      
    }

    
  }, [data])
  
  return (
    <View style={tw`flex-1 items-center `}>
      <Image style={tw`w-[214px] h-[100px] mt-[50px] mb-[30px]`} source={logoImg}/>
      <Heading title="Encontre seu duo" subtitle="selecione o game que deseja jogar..."/>
      <FlatList
        data={dataGameQuery}
        keyExtractor={(item) => item?.id}
        renderItem={({item})=>(
          <GameCard data={item}/>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pl-[32px] pr-[64px]`}
      />
    </View>
  );
}