import { Tabs, useRouter } from "expo-router";
import { GraphSvg, HomeSvg } from "../../components/Icons";
import "../../global.css"
import { HeaderUser } from "../../components/HeaderUser";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { authStore } from "../../store/authStore";

export default function TabLayout() {
    const router = useRouter();
    const { status, checkAuth } = authStore()

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (status === "not-authenticated") {
            router.replace("/(auth)/");
        }
    }, [status, router]);


    if (status === "checking") {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "indigo",
                headerShadowVisible: false,
                headerTitle: () => <HeaderUser />
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color }) => <HomeSvg color={color} width={20} />,
                }} />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Análisis",
                    tabBarIcon: ({ color }) => <GraphSvg color={color} width={20} />,
                }} />
        </Tabs>
    );
}