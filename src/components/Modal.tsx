import React from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import { CustomModalActions, CustomModalBackdrop, CustomModalContainer, CustomModalContent, CustomModalHeader, CustomModalTitle } from "./Components.styles";

interface CustomModalProps {
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  noActions?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = (props) => {
  return (
    <CustomModalBackdrop>
      <CustomModalContainer>
        <CustomModalHeader>
          <CustomModalTitle>{props.title}</CustomModalTitle>
          <IoMdClose onClick={props.onConfirm} style={{ cursor: "pointer" }} />
        </CustomModalHeader>
        <CustomModalContent>
          <div>{props.children}</div>
        </CustomModalContent>
        {!props.noActions && (
          <CustomModalActions>
            <Button onClick={props.onConfirm}>Okay</Button>
          </CustomModalActions>
        )}
      </CustomModalContainer>
    </CustomModalBackdrop>
  );
};

export default CustomModal;
