import { View, Text, TextInput, Pressable } from "react-native";
export default function AuthIndex() {
    return (
        <View className="bg-white flex-1 p-5">
            <View>
                <View>
                    <Text style={{ fontSize: 30 }} className="text-gray-600 font-bold">Hola,</Text>
                    <Text style={{ fontSize: 30 }} className="text-gray-600 font-bold mb-10">Bienvenido de nuevo</Text>
                </View>
                <View>
                    <Text className="text-gray-500 mb-6">Por favor, ingresa tus datos para continuar</Text>
                </View>
                <TextInput
                    className="border border-gray-300 p-5 rounded-2xl mb-6"
                    placeholder="Email"
                    keyboardType="email-address"
                />
                <TextInput
                    className="border border-gray-300 p-5 rounded-2xl mb-6"
                    placeholder="Password"
                    secureTextEntry
                />
                <View className="flex flex-row items-center justify-end mb-6">
                    <Text className="text-gray-500 text-sm mb-4">¿Olvidaste tu contraseña?</Text>
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
                <View className="flex flex-row items-center justify-center mt-6">
                    <Text className="text-gray-500 text-sm">¿No tienes una cuenta?</Text>
                    <Pressable>
                        <Text className="text-blue-950 text-sm ml-2">Registrate</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}