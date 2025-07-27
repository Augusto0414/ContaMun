import { Stack, useRouter } from "expo-router";
import { HeaderUser } from "../components/HeaderUser";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async (): Promise<void> => {
        const token = "";
        const authenticated = !!token;

        setIsAuthenticated(authenticated);
        setIsLoading(false);

        if (!authenticated) return router.replace("/(auth)/");

        return router.replace("/(tabs)/home");

    };


    useEffect(() => {
        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: () =>
                    isAuthenticated ? <HeaderUser /> : null,
            }}
        />
    );
}
