import React from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
interface IncomeModalProps {
  handleOpenModal: () => void;
}

export const IncomeModal = ({ handleOpenModal }: IncomeModalProps) => {
  return (
    <Pressable className="flex-1 justify-center items-center px-4 bg-black/50" onPress={handleOpenModal}>
      <Pressable className="w-full bg-white rounded-2xl shadow-lg p-6 relative ">
        <View className="mx-4">
          <View className="flex flex-row justify-between items-center mb-4  ">
            <View>
              <Text className=" w-full text-xl font-bold text-gray-600">Ingresos</Text>
              <Text className=" w-auto text-sm text-gray-600">
                Guarda tus ingresos y mantén el control de tu dinero.
              </Text>
            </View>
            <TouchableOpacity className="w-full h-auto mr-4" onPress={handleOpenModal}>
              <Text ellipsizeMode="tail" numberOfLines={2} className="text-xl font-bold text-gray-600">
                ×
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            className="border border-gray-300 rounded-lg p-2 mb-4 py-4"
            placeholder="Monto del ingreso"
            keyboardType="numeric"
          />
          <Pressable className="bg-blue-500 rounded-lg p-2 py-4" onPress={null}>
            <Text className="text-white text-center">Guardar</Text>
          </Pressable>
        </View>
      </Pressable>
    </Pressable>
  );
};
