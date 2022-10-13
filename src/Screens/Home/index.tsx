import {
  Image,
  Text,
  View,
  FlatList
} from 'react-native';

import tw from 'twrnc'
import logoImg from '../../assets/logo-nlw-esports.png'
import { GameCard } from '../../Components/GameCard';
import { Heading } from '../../Components/Heading';
import {GAMES} from '../../utils/games'

export default function Home(){
  return (
    <View style={tw`flex-1 items-center `}>
      <Image style={tw`w-[214px] h-[100px] mt-[50px] mb-[30px]`} source={logoImg}/>
      <Heading title="Encontre seu duo" subtitle="selecione o game que deseja jogar..."/>
      <FlatList
        data={GAMES}
        keyExtractor={item => item.id}
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