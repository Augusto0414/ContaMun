import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { EmailSvg, LockSvg } from "../../src/components/Icons";
import { showToast } from "../../src/helpers/showToast";
import { useAuthStore } from "../../src/store/authStore";

interface FormData {
  email?: string;
  password?: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export default function AuthIndex() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Errors>({});
  const { login, authState, authMessage } = useAuthStore();

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });

    if (field === "email") {
      const emailError = /\S+@\S+\.\S+/.test(value) ? "" : "Email inválido";
      setErrors((prev) => ({ ...prev, email: emailError }));
    }

    if (field === "password") {
      const passwordError = value.length >= 6 ? "" : "La contraseña debe tener al menos 6 caracteres";
      setErrors((prev) => ({ ...prev, password: passwordError }));
    }
  };

  const hasErrors = Object.values(errors).some((e) => e !== "");

  useEffect(() => {
    if (authState === "authenticated") {
      Object.fromEntries(Object.keys(formData).map((key) => [key, ""]));
      router.replace("/(tabs)");
      showToast(authMessage);
    }
    if (authState === "error") {
      showToast(authMessage || "Lo sentimos ocurrio un promeble");
    }
  }, [authState, authMessage, formData, router]);

  const handleLogin = async () => {
    const { email, password } = formData;
    if (hasErrors) return;
    await login({ email, password });
  };

  return (
    <SafeAreaView
      className="bg-white"
      style={[
        style.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View className="bg-white flex-1 px-5">
        <View className="mt-10">
          <Text style={{ fontSize: 30 }} className="text-gray-600 font-bold">
            Hola,
          </Text>
          <Text style={{ fontSize: 30 }} className="text-gray-600 font-bold mb-10">
            Bienvenido de nuevo
          </Text>
        </View>

        <Text className="text-gray-500 mb-6">Por favor, ingresa tus datos para continuar</Text>

        <View className="mb-3">
          <View
            className={`flex-row items-center border ${errors.email ? "border-red-500" : "border-gray-300"} px-4 py-3 rounded-2xl`}
          >
            <EmailSvg width={24} height={24} color={errors.email ? "#EF4444" : "#D1D1D2"} />
            <TextInput
              className="ml-3 flex-1 text-base"
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.nativeEvent.text)}
            />
          </View>
          {errors.email && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email}</Text>}
        </View>

        <View className="mb-3">
          <View
            className={`flex-row items-center border ${errors.password ? "border-red-500" : "border-gray-300"} px-4 py-3 rounded-2xl`}
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

        <View className="flex flex-row items-center justify-end mb-6">
          <Text className="text-gray-500 text-sm">¿Olvidaste tu contraseña?</Text>
        </View>

        <Pressable
          disabled={hasErrors || authState === "loading"}
          onPress={handleLogin}
          style={{
            shadowColor: "#172554",
            elevation: 10,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
          }}
          className="bg-blue-950 p-5 rounded-2xl mt-11 items-center justify-center"
        >
          {authState === "loading" ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-center">Iniciar sesión</Text>
          )}
        </Pressable>

        <View className="flex flex-row items-center justify-center mt-11">
          <Text className="text-gray-500 text-sm">¿No tienes una cuenta?</Text>
          <Pressable onPress={() => router.push("/(auth)/register")}>
            <Text className="text-blue-950 text-sm ml-2">Regístrate</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
