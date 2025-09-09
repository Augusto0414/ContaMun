import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { BudgetInfoCard } from "../../src/components/BudgetInfoCard";
import FabButton from "../../src/components/FabButton";
import { FinanceCard } from "../../src/components/FinanceCard";
import {
  DartSvg,
  LossChartSvg,
  MoneySvg,
  PocketSvg,
  PresentationChartSvg,
  WalletSvg,
} from "../../src/components/Icons";
import SectionCard from "../../src/components/SectionCard";
export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [savingGoals, setSavingGoals] = useState([
    // Ejemplo:
    // { title: 'Viaje a la playa', amount: 500000 },
    // { title: 'Nuevo celular', amount: 1200000 },
  ]);

  const handleAddGoal = (newGoal) => {
    setSavingGoals([...savingGoals, newGoal]);
    setModalVisible(false);
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <View>
          <View className="w-full px-4 py-4 flex flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-2xl font-bold">Resumen financiero</Text>
              <Text className="text-base text-gray-500">Resumen de tu situación financiera</Text>
            </View>
            <View className="w-12 h-12 items-center justify-center bg-[#3B82F6] rounded-full">
              <WalletSvg color={"#fff"} />
            </View>
          </View>
          <View className="px-4 bg-blue-950 mx-2 py-6 rounded-2xl shadow-lg">
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
                color="#3B82F6"
              />
            </View>
            <View className="absolute top-0 left-0 w-0 h-0 border-l-[60px] border-l-transparent border-b-[60px] border-b-white opacity-10" />
            <View className="absolute bottom-0 right-0 w-0 h-0 border-r-[60px] border-r-transparent border-t-[60px] border-t-white opacity-10" />
          </View>

          {/*Metas de ahorro */}
          <SectionCard
            title="Metas de ahorro"
            subtitle="Controla tus objetivos de ahorro"
            Icon={DartSvg}
            empty={savingGoals.length === 0}
            emptyText="Aún no tienes metas de ahorro registradas"
            subEmptyText="Empieza agregando una para visualizar tu progreso"
            buttonText="Agregar meta"
            ModalSubtitle="Define una meta de ahorro para alcanzar tus objetivos financieros"
            ModalTitle="Agregar Meta de Ahorro"
            placeHolderTitle="Título de la meta"
            placeHolderAmount="Monto de la meta"
          >
            {savingGoals.map((goal, index) => (
              <View key={index} className="px-4 py-3 border-b border-gray-700 bg-dark-900 rounded-xl mb-2">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-lg text-gray-300">{goal.title}</Text>
                  <Text className="text-lg text-gray-300">${goal.amount.toLocaleString()}</Text>
                </View>
              </View>
            ))}
          </SectionCard>

          {/*Gastos */}
          <View className="px-4">
            <View
              className="relative 
                          w-full bg-blue-950 rounded-2xl p-6 overflow-hidden shadow-lg my-4"
            >
              <SectionCard
                title="Gastos"
                subtitle="Controla tus gastos mensuales"
                Icon={<PresentationChartSvg width={24} height={24} color="#fff" />}
                empty={savingGoals.length === 0}
                emptyText="Aún no tienes metas de ahorro registradas"
                subEmptyText="Empieza agregando una para visualizar tu progreso"
                buttonText="Agregar gastos"
                ModalSubtitle="Establece un límite de gasto para mantener tus finanzas bajo control"
                ModalTitle="Agregar Límite de Gasto"
                placeHolderTitle="Título del gasto"
                placeHolderAmount="Monto del gasto"
                colorTitle="text-white"
                colorSubtitle="text-gray-300"
              >
                {savingGoals.map((goal, index) => (
                  <View key={index} className="px-4 py-3 border-b border-gray-700 bg-dark-900 rounded-xl mb-2">
                    <View className="flex flex-row justify-between items-center">
                      <Text className="text-lg text-gray-300">{goal.title}</Text>
                      <Text className="text-lg text-gray-300">${goal.amount.toLocaleString()}</Text>
                    </View>
                  </View>
                ))}
              </SectionCard>
              <View className="absolute top-0 left-0 w-0 h-0 border-l-[60px] border-l-transparent border-b-[60px] border-b-white opacity-10" />
              <View className="absolute bottom-0 right-0 w-0 h-0 border-r-[60px] border-r-transparent border-t-[60px] border-t-white opacity-10" />
            </View>
          </View>
        </View>
      </ScrollView>
      <FabButton />
    </>
  );
}
