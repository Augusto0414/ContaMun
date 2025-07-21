import { Tabs } from "expo-router";
import { GraphSvg, HomeSvg } from "../../components/Icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "indigo",
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