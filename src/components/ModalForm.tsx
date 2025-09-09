import { View, Text, TextInput, Pressable, Modal, ModalProps, TouchableOpacity } from "react-native";

type CustomModalProps = ModalProps & {
    title?: string;
    subtitle?: string;
    visible: boolean;
    placeholderTitle: string;
    placeholderAmount: string;
    onClose: () => void;
};

export default function ModalForm({ visible, onClose, title, subtitle, placeholderTitle, placeholderAmount, ...rest }: CustomModalProps) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent
            {...rest}
        >
            <View className="flex-1 justify-center items-center px-4">
                <View className="w-full bg-white rounded-2xl shadow-lg p-6 relative">
                    <TouchableOpacity
                        className="w-[10%] items-center absolute top-7 right-6 z-10"
                        onPress={onClose}
                    >
                        <Text className="text-xl font-bold text-gray-500">×</Text>
                    </TouchableOpacity>
                    <View className="flex justify-between  mb-4">

                        <Text className="text-2xl font-bold  mb-2">
                            {title ?? "Agregar Meta de Ahorro"}
                        </Text>

                        {subtitle && (
                            <Text className="text-sm text-gray-600 mb-4">
                                {subtitle}
                            </Text>
                        )}
                    </View>

                    <TextInput
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                        placeholder={placeholderTitle}
                    />
                    <TextInput
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                        placeholder={placeholderAmount}
                        keyboardType="numeric"
                    />
                    <Pressable
                        className="w-full bg-blue-600 rounded-lg p-3 items-center justify-center"
                        onPress={onClose}
                    >
                        <Text className="text-white font-semibold">Guardar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
