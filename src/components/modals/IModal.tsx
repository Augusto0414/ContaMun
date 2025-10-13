import { Modal } from "react-native";

interface IModalProps {
  children: React.ReactNode;
  handleClose?: () => void;
  isVisible?: boolean;
}

export const IModal = ({ children, handleClose, isVisible }: IModalProps) => {
  return (
    <Modal transparent animationType="fade" statusBarTranslucent visible={isVisible} onRequestClose={handleClose}>
      {children}
    </Modal>
  );
};
