import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';
import { THEME } from '../../theme';
// import {GameController} from 'phosphor-react-native'
import {Ionicons} from '@expo/vector-icons'

export interface IDuoCardProps {
  id: string;
  name: string;
  gameId: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  createAt: string;
}

interface IProps{
  data: IDuoCardProps;
  onConnect: () => void;
}

// SplashScreen.preventAutoHideAsync();

export function DuoCard({data, onConnect}: IProps){
  
  // const onLayoutRootView = useCallback(async () => {
  //   if (data) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [data]);

  // if (!data) {
  //   return null
  // }

  return ( 
    
    <SafeAreaView style={styles.container} >
    <DuoInfo label='Nome' value={data.name} />
    <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying} anos`} />
    <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`} />
    <DuoInfo label='Chamada de áudio?'
     value={data.useVoiceChannel ? 'Sim' : 'Não'}
     colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} />
     <TouchableOpacity style={styles.button} onPress={onConnect}>
      <Ionicons
      name='game-controller-outline'
      color={THEME.COLORS.TEXT}
      size={20}
      />
      <Text
      style={styles.buttonTitle}
      >
        Conecte-se!
      </Text>
     </TouchableOpacity>
    </SafeAreaView>

  );
}