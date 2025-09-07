import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowBackSvg, EmailSvg, LockSvg, UserSvg } from "../../components/Icons";
import { showToast } from "../../helpers/showToast";
import { useAuthStore } from "../../store/authStore";

interface FormData {
  name?: string;
  email?: string;
  password?: string;
  verifyPassword?: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  verifyPassword?: string;
}

export default function RegisterPage() {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Errors>({});
  const { authMessage, authState, createUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (authState === "sucess") {
      setFormData(Object.fromEntries(Object.keys(formData).map((key) => [key, ""])));
      setTimeout(() => {
        showToast(authMessage);
      }, 20000);
    }

    if (authState === "error") {
      setTimeout(() => {
        showToast(authMessage || "Ocurrió un error");
      }, 20000);
    }
  }, [authState, formData, authMessage]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    switch (field) {
      case "name":
        setErrors((prev) => ({ ...prev, name: value.trim() ? "" : "El nombre es obligatorio" }));
        break;
      case "email":
        setErrors((prev) => ({
          ...prev,
          email: /\S+@\S+\.\S+/.test(value) ? "" : "Email inválido",
        }));
        break;
      case "password":
        setErrors((prev) => ({
          ...prev,
          password: value.length >= 6 ? "" : "La contraseña debe tener al menos 6 caracteres",
        }));
        break;
      case "verifyPassword":
        setErrors((prev) => ({
          ...prev,
          verifyPassword: value === formData.password ? "" : "Las contraseñas no coinciden",
        }));
        break;
    }
  };

  const hasErrors = Object.values(errors).some((e) => e !== "");

  const handleRegister = async () => {
    const { name, email, password } = formData;
    if (hasErrors) return;
    await createUser({ name, email, password });
  };

  return (
    <SafeAreaView
      className="bg-white"
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="bg-white flex-1 px-5">
          <Pressable className="h-7 w-7 mb-2" onPress={() => router.back()}>
            <View className="bg-gray-300 p-6 rounded-lg absolute top-1 left-0">
              <View className="flex justify-center items-center">
                <ArrowBackSvg width={24} height={24} />
              </View>
            </View>
          </Pressable>

          <ScrollView>
            <View className="mt-10">
              <Text style={{ fontSize: 30 }} className="text-gray-600 font-bold mb-10">
                Te invitamos a que te registres
              </Text>
            </View>

            <Text className="text-gray-500 mb-6">Por favor, completa los siguientes campos para registrarte</Text>

            <View className="mb-3">
              <View
                className={`flex-row items-center border px-4 py-3 rounded-2xl ${errors.name ? "border-red-500" : "border-gray-300"}`}
              >
                <UserSvg width={24} height={24} color={errors.name ? "#EF4444" : "#D1D1D2"} />
                <TextInput
                  className="ml-3 flex-1 text-base"
                  placeholder="Nombre"
                  keyboardType="default"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.nativeEvent.text)}
                />
              </View>
              {errors.name && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.name}</Text>}
            </View>
            <View className="mb-3">
              <View
                className={`flex-row items-center border px-4 py-3 rounded-2xl ${errors.email ? "border-red-500" : "border-gray-300"}`}
              >
                <EmailSvg width={24} height={24} color={errors.email ? "#EF4444" : "#D1D1D2"} />
                <TextInput
                  className="ml-3 flex-1 text-base"
                  placeholder="Correo electrónico"
                  keyboardType="email-address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.nativeEvent.text)}
                />
              </View>
              {errors.email && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email}</Text>}
            </View>

            <View className="mb-3">
              <View
                className={`flex-row items-center border px-4 py-3 rounded-2xl ${errors.password ? "border-red-500" : "border-gray-300"}`}
              >
                <LockSvg width={24} height={24} color={errors.password ? "#EF4444" : "#D1D1D2"} />
                <TextInput
                  className="ml-3 flex-1 text-base"
                  placeholder="Contraseña"
                  secureTextEntry
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.nativeEvent.text)}
                />
              </View>
              {errors.password && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.password}</Text>}
            </View>

            <View className="mb-3">
              <View
                className={`flex-row items-center border px-4 py-3 rounded-2xl ${errors.verifyPassword ? "border-red-500" : "border-gray-300"}`}
              >
                <LockSvg width={24} height={24} color={errors.verifyPassword ? "#EF4444" : "#D1D1D2"} />
                <TextInput
                  className="ml-3 flex-1 text-base"
                  placeholder="Confirmar contraseña"
                  secureTextEntry
                  value={formData.verifyPassword}
                  onChange={(e) => handleInputChange("verifyPassword", e.nativeEvent.text)}
                />
              </View>
              {errors.verifyPassword && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.verifyPassword}</Text>}
            </View>

            <Pressable
              disabled={hasErrors || authState === "loading"}
              onPress={handleRegister}
              style={{
                shadowColor: "#172554",
                elevation: 10,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                opacity: hasErrors ? 0.6 : 1,
              }}
              className="bg-blue-950 p-5 rounded-2xl mt-11 items-center justify-center"
            >
              {authState === "loading" ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-center">Registrar</Text>
              )}
            </Pressable>

            <View className="my-10" />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
