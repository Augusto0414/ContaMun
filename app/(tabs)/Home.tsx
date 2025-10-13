import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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
import { IncomeModal } from "../../src/components/modals/IncomeModal";
import SectionCard from "../../src/components/SectionCard";
import { useAuthStore } from "../../src/store/authStore";
import { useExpenseStore } from "../../src/store/expenseStore";
import { goalStore } from "../../src/store/goalStore";
export default function HomePage() {
  const { goals, getGoals, goalState, isGoalError, deleteGoal } = goalStore();
  const { expenses, getExpenses, expenseState, isExpenseError, deleteExpense } = useExpenseStore();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { user } = useAuthStore();
  const userID = user?.uid;

  useEffect(() => {
    if (userID) {
      getGoals({ userID });
    }
  }, [getGoals, userID]);

  useEffect(() => {
    if (userID) {
      getExpenses({ userID });
    }
  }, [userID, getExpenses]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
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
            empty={goals.length === 0}
            emptyText="Aún no tienes metas de ahorro registradas"
            subEmptyText="Empieza agregando una para visualizar tu progreso"
            buttonText="Agregar meta"
            ModalSubtitle="Define una meta de ahorro para alcanzar tus objetivos financieros"
            ModalTitle="Agregar Meta de Ahorro"
            placeHolderTitle="Título de la meta"
            placeHolderAmount="Monto de la meta"
            type="income"
          >
            {goalState === "loading" ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : isGoalError ? (
              <Text className="text-red-500 text-center">Error al cargar las metas</Text>
            ) : (
              goals.map((goal, index) => (
                <View key={index} className="px-4 py-3 border-b border-gray-700 bg-dark-900 rounded-xl mb-2">
                  <View className="flex flex-row justify-between items-center">
                    <Text ellipsizeMode="tail" numberOfLines={1} className="text-lg text-gray-300 w-[40%]">
                      {goal.title}
                    </Text>
                    <View className="flex flex-row gap-2 w-[60%] justify-end items-center">
                      <Text ellipsizeMode="tail" numberOfLines={1} className="text-lg text-gray-300">
                        ${goal.amount.toLocaleString()}
                      </Text>
                      <TouchableOpacity activeOpacity={0.7} className="bg-blue-500 rounded-lg p-1 mt-1">
                        <Text className="text-white text-center text-sm">Editar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteGoal({ goalID: goal.id })}
                        activeOpacity={0.7}
                        className="bg-red-400 rounded-lg p-1 mt-1"
                      >
                        <Text className="text-white text-center text-sm">Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
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
                empty={expenses.length === 0}
                emptyText="Aún no tienes gastos registrados"
                subEmptyText="Empieza agregando uno para visualizar tus gastos"
                buttonText="Agregar gastos"
                ModalSubtitle="Establece un límite de gasto para mantener tus finanzas bajo control"
                ModalTitle="Agregar Límite de Gasto"
                placeHolderTitle="Título del gasto"
                placeHolderAmount="Monto del gasto"
                colorTitle="text-white"
                colorSubtitle="text-gray-300"
                type="expense"
              >
                {expenseState === "loading" ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : isExpenseError ? (
                  <Text className="text-red-500 text-center">Error al cargar los gastos</Text>
                ) : (
                  expenses.map((expense, index) => (
                    <View key={index} className="px-4 py-3 border-b border-gray-700 bg-dark-900 rounded-xl mb-2">
                      <View className="flex flex-row justify-between items-center">
                        <Text ellipsizeMode="tail" numberOfLines={1} className="text-lg text-gray-300 w-[20%]">
                          {expense.title}
                        </Text>
                        <View className="flex flex-row gap-2 w-[80%] justify-end items-center">
                          <Text ellipsizeMode="tail" numberOfLines={1} className="text-lg text-gray-300">
                            <Text className="text-lg text-gray-300">${expense.amount.toLocaleString()}</Text>
                          </Text>
                          <TouchableOpacity activeOpacity={0.7} className="bg-blue-500 rounded-lg p-1 mt-1">
                            <Text className="text-white text-center text-sm">Editar</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => deleteExpense({ expenseId: expense.id! })}
                            activeOpacity={0.7}
                            className="bg-red-400 rounded-lg p-1 mt-1"
                          >
                            <Text className="text-white text-center text-sm">Eliminar</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </SectionCard>
              <View className="absolute top-0 left-0 w-0 h-0 border-l-[60px] border-l-transparent border-b-[60px] border-b-white opacity-10" />
              <View className="absolute bottom-0 right-0 w-0 h-0 border-r-[60px] border-r-transparent border-t-[60px] border-t-white opacity-10" />
            </View>
          </View>
        </View>
      </ScrollView>
      <IncomeModal isVisible={openModal} handleClose={handleOpenModal}>
        <Pressable className="flex-1 justify-center items-center px-4 bg-black/50" onPress={handleOpenModal}>
          <Pressable className="w-full bg-white rounded-2xl shadow-lg p-6 relative ">
            <View className="mx-4">
              <View className="flex flex-row justify-between items-center mb-4  ">
                <View>
                  <Text className=" w-full text-xl font-bold text-gray-600">Ingresos</Text>
                  <Text className=" w-auto text-sm text-gray-600">
                    Guarda tus ingresos y mantén el control de tu dinero.
                  </Text>
                </View>
                <TouchableOpacity className="w-full h-auto mr-4" onPress={handleOpenModal}>
                  <Text ellipsizeMode="tail" numberOfLines={2} className="text-xl font-bold text-gray-600">
                    ×
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-4 py-4"
                placeholder="Monto del ingreso"
                keyboardType="numeric"
              />
              <Pressable className="bg-blue-500 rounded-lg p-2 py-4" onPress={null}>
                <Text className="text-white text-center">Guardar</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </IncomeModal>
      <FabButton onPress={handleOpenModal} />
    </>
  );
}
