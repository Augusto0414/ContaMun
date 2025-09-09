import { View, Text } from "react-native";
import React from "react";

type FinanceCardProps = {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    side?: "left" | "right";
};

export const FinanceCard = ({
    title,
    value,
    icon,
    color,
    side,
}: FinanceCardProps) => {
    return (
        <View
            className={`backdrop-blur-sm p-4 flex flex-row items-center rounded-2xl border flex-1 ${side === "left" ? "mr-2" : side === "right" ? "ml-2" : ""
                }`}
            style={{
                backgroundColor: `${color}33`,
                borderColor: `${color}4D`,
            }}
        >
            <View
                className="p-2 rounded-xl"
                style={{ backgroundColor: `${color}4D` }}
            >
                {icon}
            </View>
            <View className="ml-3">
                <Text
                    className="text-sm font-medium"
                    style={{ color: color }}
                >
                    {title}
                </Text>
                <Text className="text-white text-lg font-bold">{value}</Text>
            </View>
        </View>
    );
};
