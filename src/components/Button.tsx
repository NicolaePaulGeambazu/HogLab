import React from "react";
import { ButtonStyled } from "./Components.styles";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonStyled
      type={props.type || "button"}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </ButtonStyled>
  );
};

export default Button;