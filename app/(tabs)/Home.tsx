import { View, Text } from "react-native";
import { LossChartSvg, MoneySvg, PocketSvg, WalletSvg } from "../../components/Icons";
import { BudgetInfoCard } from "../../components/BudgetInfoCard";
import { FinanceCard } from "../../components/FinanceCard";
export default function HomePage() {
    return (
        <>
            <View className="flex-1 bg-white">
                <View className="w-full px-4 flex flex-row items-center justify-between mb-10">
                    <View>
                        <Text className="text-2xl  font-bold">Resumen financiero</Text>
                        <Text className="text-base text-gray-500">Resumen de tu situación financiera</Text>
                    </View>
                    <View className="w-12 h-12 items-center justify-center bg-blue-400 rounded-full">
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
            </View>
        </>
    );
}