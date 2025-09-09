import { View, Text } from "react-native";

type SummaryCardProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
    percentage: string;
    color?: string;
};

export const BudgetInfoCard = ({
    icon,
    title,
    value,
    percentage,
    color = "#000",
}: SummaryCardProps) => (
    <View className="w-full p-5 mr-10 flex-row rounded-xl" style={{
        backgroundColor: `${color}22`, borderColor: `${color}4D`,
        borderWidth: 1,
    }}>
        <View className="flex justify-center mr-2">{icon}</View>
        <View>
            <Text style={{ color }}>{title}</Text>
            <Text className="text-white font-bold">{value}</Text>
        </View>
        <View className="flex-1 justify-center items-end">
            <Text style={{ color }} className="text-xs">{percentage}</Text>
        </View>
    </View>
);
