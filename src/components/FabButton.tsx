import { Text, TouchableOpacity, View } from "react-native";
import { useIncomeStore } from "../store/incomeStore";

export default function FabButton() {
  const { saveIncome } = useIncomeStore();
  return (
    <View className="absolute bottom-4 right-4">
      <TouchableOpacity
        style={{
          shadowColor: "#10B981",
          elevation: 10,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
        }}
        className="bg-blue-950 p-4 rounded-full"
      >
        <Text className="text-white text-sm"> + Agregar ingresos</Text>
      </TouchableOpacity>
    </View>
  );
}
