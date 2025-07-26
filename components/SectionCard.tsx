import { View, Text, Pressable } from 'react-native';
import ModalForm from './ModalForm';
import { useState } from 'react';

interface SectionCardProps {
    title: string;
    subtitle: string;
    Icon: React.ComponentType<any>;
    children?: React.ReactNode;
    empty?: boolean;
    emptyText?: string;
    subEmptyText?: string;
    buttonText?: string;
    showAddButton?: boolean;
}

const SectionCard = ({
    title,
    subtitle,
    Icon,
    children,
    empty = false,
    emptyText = 'No hay elementos registrados aún',
    subEmptyText,
    buttonText = 'Agregar',
    showAddButton = true,
}: SectionCardProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <View className="py-4 px-4">
                <View className="w-full flex flex-row items-center justify-between mt-4">
                    <View>
                        <Text className="text-2xl text-gray-600 font-bold">{title}</Text>
                        <Text className="text-base text-gray-500">{subtitle}</Text>
                    </View>
                    <View>
                        <Icon />
                    </View>
                </View>

                <View className="mt-6">
                    {empty ? (
                        <View className="py-12 items-center justify-center bg-dark-900 rounded-xl">
                            <Text className="text-gray-400 text-center">{emptyText}</Text>
                            <Text className="text-gray-500 text-center text-sm mt-1">{subEmptyText}</Text>
                            {showAddButton && (
                                <Pressable
                                    onPress={handleOpenModal}
                                    className="mt-6 px-6 py-3 bg-blue-600 rounded-full"
                                >
                                    <Text className="text-white font-semibold">{buttonText}</Text>
                                </Pressable>
                            )}
                        </View>
                    ) : (
                        <>
                            {children}
                            {showAddButton && (
                                <Pressable
                                    className="mt-4 px-4 py-4 bg-blue-600 rounded-lg flex items-center justify-center"
                                    onPress={handleOpenModal}
                                >
                                    <Text className="text-white">{buttonText}</Text>
                                </Pressable>
                            )}
                        </>
                    )}
                </View>
            </View>

            <ModalForm visible={isModalVisible} onClose={handleCloseModal} />
        </>
    );
};

export default SectionCard;
