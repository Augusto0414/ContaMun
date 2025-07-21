import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import App from "./App";

export default function AppPage() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <StatusBar style="light" />
                <App />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
    },
});