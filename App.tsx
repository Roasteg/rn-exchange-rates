import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  useColorScheme();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
