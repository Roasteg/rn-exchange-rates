import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Provider, useDispatch } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import store, { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { getCurrencyList } from "./store/slices/currencies";

export default function App() {
  
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Provider store={store}>
                <HomeScreen />
            </Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
