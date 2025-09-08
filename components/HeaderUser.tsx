import { Text, View } from "react-native";
import { useAuthStore } from "../store/authStore";

export const HeaderUser = () => {
  const { user } = useAuthStore();

  return (
    <View className="flex flex-row items-center space-x-3 pt-5 mb-5 my-2">
      <View className="w-10 h-10 bg-gray-200 items-center justify-center rounded-full">
        <Text className="text-2xl font-bold text-gray-700">U</Text>
      </View>
      <View className="ml-2">
        <Text className="text-2xl font-semibold">Bienvenido</Text>
        <Text className="text-sm text-gray-500">{user.email} </Text>
      </View>
    </View>
  );
};
