import { LinearGradient } from 'expo-linear-gradient';
import {
  TouchableOpacity,TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text
} from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

export interface IGameCardProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {ads: number}
}

interface IProps extends TouchableOpacityProps{
  data: IGameCardProps;
}
export function GameCard({data, ...rest}: IProps){
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground source={{uri: data.bannerUrl}} style={styles.cover}>
      <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
        <Text style={styles.name}>
          {data.title}
        </Text>
        <Text style={styles.ads}>
          {data._count.ads} anúncios
        </Text>
      </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}