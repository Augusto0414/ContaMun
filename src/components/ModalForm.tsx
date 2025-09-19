import { useCallback, useEffect, useState } from "react";
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
import { useExpenseStore } from "../store/expenseStore";
import { goalStore } from "../store/goalStore";

type InputConfig = {
  value: string;
  placeholder: string;
  keyboardType: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
};

type FormData = {
  title: string;
  description: string;
  amount: number;
};

type CustomModalProps = ModalProps & {
  title?: string;
  subtitle?: string;
  visible: boolean;
  initialInputs: Record<string, InputConfig>;
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
  const { expenseState, saveExpense, resetExpense } = useExpenseStore();

  const resetForm = useCallback(() => {
    setFormInput(initialInputs);
  }, [initialInputs]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const isFormValid = useCallback(() => {
    const titleValue = formInput.title?.value?.trim();
    const amountValue = formInput.amount?.value?.trim();

    if (!titleValue || !amountValue) {
      return false;
    }

    const numericAmount = Number(amountValue);
    return !isNaN(numericAmount) && numericAmount > 0;
  }, [formInput]);

  useEffect(() => {
    if (goalState === "success") {
      const { goalMessage } = goalStore.getState();
      showToast(goalMessage);
      handleClose();
      resetGoal();
    } else if (goalState === "error") {
      const { goalMessage } = goalStore.getState();
      showToast(goalMessage);
      resetGoal();
    }
  }, [goalState, handleClose, resetGoal]);

  useEffect(() => {
    if (expenseState === "success") {
      const { expenseMessage } = useExpenseStore.getState();
      showToast(expenseMessage);
      handleClose();
      resetExpense();
    } else if (expenseState === "error") {
      const { expenseMessage } = useExpenseStore.getState();
      showToast(expenseMessage);
      resetExpense();
    }
  }, [expenseState, handleClose, resetExpense]);

  useEffect(() => {
    if (visible) {
      setFormInput(initialInputs);
    }
  }, [visible, initialInputs]);

  const handleInputChange = useCallback((key: string, text: string) => {
    setFormInput((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: text },
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isFormValid()) {
      showToast("Por favor, completa todos los campos correctamente");
      return;
    }

    const formData: FormData = {
      title: formInput.title.value.trim(),
      description: formInput.description?.value?.trim() || "",
      amount: Number(formInput.amount.value),
    };

    if (type === "income") {
      savingGoal(formData);
    } else if (type === "expense") {
      saveExpense(formData);
    }
  }, [formInput, type, isFormValid, savingGoal, saveExpense]);

  const isLoading = goalState === "loading" || expenseState === "loading";

  const getButtonText = () => {
    if (isLoading) {
      return type === "income" ? "Guardando Ingreso..." : "Guardando Gasto...";
    }
    return type === "income" ? "Guardar Ingreso" : "Guardar Gasto";
  };

  const getModalTitle = () => {
    return title ?? (type === "income" ? "Agregar Ingreso" : "Agregar Gasto");
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={handleClose}
      statusBarTranslucent
      {...rest}
    >
      <Pressable className="flex-1 justify-center items-center px-4 bg-black/50" onPress={handleClose}>
        <Pressable className="w-full bg-white rounded-2xl shadow-lg p-6 relative">
          <TouchableOpacity
            className="w-8 h-8 items-center justify-center absolute top-4 right-4 z-10 rounded-full bg-gray-100"
            onPress={handleClose}
            disabled={isLoading}
          >
            <Text className="text-lg font-bold text-gray-600">×</Text>
          </TouchableOpacity>

          <View className="mb-6 pr-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">{getModalTitle()}</Text>
            {subtitle && <Text className="text-sm text-gray-600">{subtitle}</Text>}
          </View>

          <View className="mb-6">
            {Object.entries(formInput).map(([key, config]) => {
              const { value, placeholder, keyboardType, numberOfLines, multiline } = config;

              return (
                <View key={key} className="mb-4">
                  <TextInput
                    className={`
                      w-full border border-gray-300 rounded-lg p-3 text-gray-900
                      ${multiline ? "h-[120px] text-top" : "h-12"}
                      ${isLoading ? "bg-gray-100" : "bg-white"}
                    `}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    keyboardType={keyboardType}
                    value={value}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={!isLoading}
                    onChangeText={(text) => handleInputChange(key, text)}
                  />
                </View>
              );
            })}
          </View>

          <Pressable
            className={`
              w-full rounded-lg p-4 items-center justify-center flex-row
              ${isFormValid() && !isLoading ? "bg-blue-600" : "bg-gray-400"}
            `}
            onPress={handleSubmit}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading && <ActivityIndicator size="small" color="#fff" className="mr-2" />}
            <Text className="text-white font-semibold text-base">{getButtonText()}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
