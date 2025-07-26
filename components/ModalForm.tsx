import { View, Text, TextInput, Pressable, Modal } from "react-native";

type ModalFormProps = {
    visible: boolean;
    onClose: () => void;
}

export default function ModalForm({ visible, onClose }: ModalFormProps) {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="w-[80%] h-[50%] bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center mx-auto my-auto">
                <Text className="text-2xl font-bold mb-4">Agregar Meta de Ahorro</Text>
                <TextInput
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                    placeholder="Título de la meta"
                />
                <TextInput
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                    placeholder="Monto a ahorrar"
                    keyboardType="numeric"
                />
                <Pressable
                    className="w-full bg-blue-600 rounded-lg p-3 items-center justify-center"
                    onPress={() => {
                        onClose();
                    }}
                >
                    <Text className="text-white font-semibold">Guardar Meta</Text>
                </Pressable>
            </View>
        </Modal>
    );
}