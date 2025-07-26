import { Stack } from "expo-router";
import { HeaderUser } from "../components/HeaderUser";
export default function Layout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: () => <HeaderUser />,
                }}
            />
        </>
    );
}
