import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardTypeOptions,
  Modal,
  ModalProps,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showToast } from "../helpers/showToast";
import { goalStore } from "../store/goalStore";

type InputConfig = {
  value: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
};

type CustomModalProps = ModalProps & {
  title?: string;
  subtitle?: string;
  visible: boolean;
  initialInputs: Record<string, any>;
  type: "income" | "expense";
  onClose: () => void;
};

export default function ModalForm({
  visible,
  onClose,
  title,
  subtitle,
  initialInputs,
  type,
  ...rest
}: CustomModalProps) {
  const [formInput, setFormInput] = useState<Record<string, InputConfig>>(initialInputs);
  const { savingGoal, goalState, resetGoal } = goalStore();

  useEffect(() => {
    if (goalState === "success") {
      const { goalMessage } = goalStore.getState();
      showToast(goalMessage);
      setFormInput(initialInputs);
      onClose();
      resetGoal();
    }
    if (goalState === "error") {
      const { goalMessage } = goalStore.getState();
      showToast(goalMessage);
      resetGoal();
    }
  }, [goalState, initialInputs, onClose, resetGoal]);

  const handleSubmit = () => {
    if (type === "income") {
      savingGoal({
        title: formInput.title.value,
        description: formInput.description.value,
        amount: Number(formInput.amount.value),
      });
    }
    if (type === "expense") {
    }
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose} statusBarTranslucent {...rest}>
      <View className="flex-1 justify-center items-center px-4">
        <View className="w-full bg-white rounded-2xl shadow-lg p-6 relative">
          <TouchableOpacity className="w-[10%] items-center absolute top-7 right-6 z-10" onPress={onClose}>
            <Text className="text-xl font-bold text-gray-500">×</Text>
          </TouchableOpacity>
          <View className="flex justify-between  mb-4">
            <Text className="text-2xl font-bold  mb-2">{title ?? "Agregar Meta de Ahorro"}</Text>

            {subtitle && <Text className="text-sm text-gray-600 mb-4">{subtitle}</Text>}
          </View>

          {Object.entries(formInput).map(([key, { value, placeholder, keyboardType, numberOfLines, multiline }]) => (
            <TextInput
              key={key}
              className={`${multiline ? "w-full border border-gray-300 rounded-lg p-3 mb-4 h-[120px]" : "w-full border border-gray-300 rounded-lg p-3 mb-4"}`}
              placeholder={placeholder}
              keyboardType={keyboardType}
              value={value}
              multiline={multiline}
              numberOfLines={numberOfLines}
              onChangeText={(text) =>
                setFormInput((prev) => ({
                  ...prev,
                  [key]: { ...prev[key], value: text },
                }))
              }
            />
          ))}

          <Pressable
            className="w-full bg-blue-600 rounded-lg p-3 items-center justify-center flex-row"
            onPress={handleSubmit}
            disabled={goalState === "loading"}
          >
            {goalState === "loading" && <ActivityIndicator size="small" color="#fff" className="mr-2" />}
            <Text className="text-white font-semibold">
              {goalState === "loading"
                ? type === "income"
                  ? "Guardando Ingreso..."
                  : "Guardando Gasto..."
                : type === "income"
                  ? "Guardar Ingreso"
                  : "Guardar Gasto"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
