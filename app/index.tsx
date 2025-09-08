import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../store/authStore";

export default function Index() {
  const { user, authState } = useAuthStore();
  const rootNavigationState = useRootNavigationState();
  useEffect(() => {
    if (!rootNavigationState?.key) return;
    const timeoutId = setTimeout(() => {
      if (user?.token) {
        router.replace("/(tabs)");
      }
      router.replace("/(auth)");
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [user, authState, rootNavigationState?.key]);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
