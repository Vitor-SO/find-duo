import { StatusBar } from 'react-native';
import tw from 'twrnc'
import  Background  from './src/Components/Background';
import { useFonts, Inter_400Regular,Inter_600SemiBold,Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import Home  from './src/Screens/Home';
import Loading from './src/Components/Loading';
export default function App() {

  const [fontsLoaded]=useFonts({
    Inter_400Regular,Inter_600SemiBold,Inter_700Bold, Inter_900Black
  })

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
      {fontsLoaded ? <Home/> : <Loading/>}
    </Background>
  );
}
