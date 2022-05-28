import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import constants from './src/css/constants';
import MainNavigation from "./src/navigation/MainNavigation";
import { ThemeProvider } from './src/context/ThemeContext'

export default function App() {
  return (
      <SafeAreaProvider style={{backgroundColor: constants.color_4}}>
        <SafeAreaView style={{flex: 1}}>
          <ThemeProvider>
            <MainNavigation />
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
  )
}
