import React from "react";
import { CardStyled } from "./Components.styles";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <CardStyled>{props.children}</CardStyled>
  );
};

export default Card;