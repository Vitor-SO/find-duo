import {
  ActivityIndicator,
  View
} from 'react-native';
import { THEME } from '../../theme';

export default function Loading(){
  return (
    <View>
      <ActivityIndicator color={THEME.COLORS.PRIMARY}/>
    </View>
  );
}