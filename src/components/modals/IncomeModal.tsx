import { Modal } from "react-native";

interface IncomeModalProps {
  children: React.ReactNode;
  handleClose?: () => void;
  isVisible?: boolean;
}

export const IncomeModal = ({ children, handleClose, isVisible }: IncomeModalProps) => {
  return (
    <Modal transparent animationType="fade" statusBarTranslucent visible={isVisible} onRequestClose={handleClose}>
      {children}
    </Modal>
  );
};
