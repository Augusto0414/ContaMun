import { View, Text, ScrollView, Pressable } from "react-native";
import { DartSvg, LossChartSvg, MoneySvg, PocketSvg, PresentationChartSvg, WalletSvg } from "../../components/Icons";
import { BudgetInfoCard } from "../../components/BudgetInfoCard";
import { FinanceCard } from "../../components/FinanceCard";
export default function HomePage() {
    return (
        <>
            <ScrollView className="flex-1 bg-white">
                <View>
                    <View className="w-full px-4 flex flex-row items-center justify-between mb-6">
                        <View>
                            <Text className="text-2xl font-bold">Resumen financiero</Text>
                            <Text className="text-base text-gray-500">Resumen de tu situación financiera</Text>
                        </View>
                        <View className="w-12 h-12 items-center justify-center bg-[#3B82F6] rounded-full">
                            <WalletSvg color={"#fff"} />
                        </View>
                    </View>
                    <View className="px-4 bg-gray-700 mx-2 py-6 rounded-2xl shadow-lg">
                        <View className="w-full flex justify-around flex-row mb-4">
                            <FinanceCard
                                title="Ingresos"
                                value="$2,344,555"
                                icon={<MoneySvg width={24} height={24} color="#10B981" />}
                                color="#10B981"
                                side="left"
                            />
                            <FinanceCard
                                title="Gastos"
                                value="$1,146,555"
                                icon={<LossChartSvg width={24} height={24} color="#F43F5E" />}
                                color="#F43F5E"
                                side="right"
                            />
                        </View>

                        <View className="w-full h-px bg-gray-600 mb-4" />

                        <View>
                            <BudgetInfoCard
                                icon={<PocketSvg color={"#3B82F6"} />}
                                title={"Te queda"}
                                value={"1.198.000"}
                                percentage={"59% libre"}
                                color="#3B82F6" />
                        </View>
                    </View>

                    {/*Metas de ahorro */}

                    <View className="px-4 mt-6">
                        <View className="w-full flex justify-between flex-row items-center">
                            <View>
                                <Text className="text-2xl text-gray-600 font-bold">Metas de ahorro</Text>
                                <Text className="text-base text-gray-500">Controla tus objetivos de ahorro</Text>
                            </View>
                            <View>
                                <DartSvg />
                            </View>
                        </View>
                        <View className="w-full py-4 bg-dark-900">
                            <View className="flex flex-row items-center justify-between px-4">
                                <Text className="text-lg text-gray-300">Viaje a la playa</Text>
                                <Text className="text-lg text-gray-300">$500.000</Text>
                            </View>
                            <View className="w-full h-px bg-gray-600 my-2" />
                            <View className="flex flex-row items-center justify-between px-4">
                                <Text className="text-lg text-gray-300">Nuevo celular</Text>
                                <Text className="text-lg text-gray-300">$1.200.000</Text>
                            </View>
                        </View>
                        <View className="py-4">
                            <Pressable className="*:mt-4 px-4 py-4 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Text className="text-white">Agregar</Text>
                            </Pressable>
                        </View>
                    </View>
                    {/*Gastos */}
                    <View className="py-4 px-4">
                        <View className="w-full flex flex-row items-center justify-between mt-4">
                            <View>
                                <Text className="text-2xl font-bold">Gastos</Text>
                                <Text className="text-base text-gray-500">Controla tus gastos mensuales</Text>
                            </View>
                            <View>
                                <PresentationChartSvg />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}