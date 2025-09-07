import { Tabs } from "expo-router";
import { HeaderUser } from "../../components/HeaderUser";
import { GraphSvg, HomeSvg } from "../../components/Icons";
import "../../global.css";

export default function TabLayout() {
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (status === "not-authenticated") {
  //       router.replace("/(auth)/");
  //     }
  //   }, [status, router]);

  //   if (status === "checking") {
  //     return (
  //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //         <ActivityIndicator size="large" />
  //       </View>
  //     );
  //   }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "indigo",
        headerShadowVisible: false,
        headerTitle: () => <HeaderUser />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <HomeSvg color={color} width={20} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Análisis",
          tabBarIcon: ({ color }) => <GraphSvg color={color} width={20} />,
        }}
      />
    </Tabs>
  );
}
