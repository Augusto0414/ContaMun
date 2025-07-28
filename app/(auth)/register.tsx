import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { ArrowBackSvg, EmailSvg, LockSvg, UserSvg } from "../../components/Icons";
import { useRouter } from "expo-router";
import React from 'react';

export default function RegisterPage() {
    const router = useRouter();
    return (
        <>
            <View className="bg-white flex-1 px-5">
                <Pressable
                    className="h-5 w-5 mb-5"
                    onPress={() => router.back()}
                >
                    <View className="bg-gray-300 p-8 rounded-lg absolute top-1 left-0">
                        <View className='flex justify-center items-center'>
                            <ArrowBackSvg width={32} height={32} />
                        </View>
                    </View>
                </Pressable>
                <ScrollView>
                    <View className="mt-10">
                        <Text style={{ fontSize: 30 }} className="text-gray-600 font-bold mb-10">Te invitamos a que te registres</Text>
                    </View>
                    <Text className="text-gray-500 mb-6">Por favor, completa los siguientes campos para registrarte</Text>
                    <View className="flex-row items-center border border-gray-300 px-4 py-3 rounded-2xl mb-6">
                        <UserSvg width={24} height={24} color="#D1D1D2" />
                        <TextInput
                            className="ml-3 flex-1 text-base"
                            placeholder="name"
                            keyboardType="default"
                        />
                    </View>
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
                    <View className="flex-row items-center border border-gray-300 px-4 py-3 rounded-2xl mb-6">
                        <LockSvg width={24} height={24} color="#D1D1D2" />
                        <TextInput
                            className=" ml-3 flex-1 text-base"
                            placeholder="Verify password"
                            secureTextEntry
                        />
                    </View>

                    <Pressable style={{
                        shadowColor: '#172554',
                        elevation: 10,
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.4,
                        shadowRadius: 10,

                    }} className="bg-blue-950 p-5 rounded-2xl">
                        <Text className="text-white text-center">Registrar</Text>
                    </Pressable>
                    <View className='my-10'></View>
                </ScrollView>
            </View>
        </>

    );
}