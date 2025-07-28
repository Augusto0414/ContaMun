import { View, Text, TextInput, Pressable } from "react-native";
import { EmailSvg, LockSvg } from "../../components/Icons";
import { useRouter } from "expo-router";

export default function AuthIndex() {
    const router = useRouter();
    return (
        <>
            <View className="bg-white flex-1 px-5">
                <View className="mt-10">
                    <Text style={{ fontSize: 30 }} className="text-gray-600 font-bold">Hola,</Text>
                    <Text style={{ fontSize: 30 }} className="text-gray-600 font-bold mb-10">Bienvenido de nuevo</Text>
                </View>
                <Text className="text-gray-500 mb-6">Por favor, ingresa tus datos para continuar</Text>
                <View className="flex-row items-center border border-gray-300 px-4 py-3 rounded-2xl mb-6">
                    <EmailSvg width={24} height={24} color="#D1D1D2" />
                    <TextInput
                        className="ml-3 flex-1 text-base"
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                </View>
                <View className="flex-row items-center border border-gray-300 px-4 py-3 rounded-2xl mb-6">
                    <LockSvg width={24} height={24} color="#D1D1D2" />
                    <TextInput
                        className=" ml-3 flex-1 text-base"
                        placeholder="Password"
                        secureTextEntry
                    />
                </View>
                <View className="flex flex-row items-center justify-end mb-6">
                    <Text className="text-gray-500 text-sm mb-2">¿Olvidaste tu contraseña?</Text>
                </View>
                <Pressable style={{
                    shadowColor: '#172554',
                    elevation: 10,
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.4,
                    shadowRadius: 10,

                }} className="bg-blue-950 p-5 rounded-2xl">
                    <Text className="text-white text-center">Login</Text>
                </Pressable>
                <View className="flex flex-row items-center justify-center mt-11">
                    <Text className="text-gray-500 text-sm">¿No tienes una cuenta?</Text>
                    <Pressable
                        onPress={() => router.push("/(auth)/register")}
                    >
                        <Text className="text-blue-950 text-sm ml-2">Registrate</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
}