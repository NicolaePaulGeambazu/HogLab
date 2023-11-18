import React, { memo } from "react";
import { User } from "../../types/types";
import { AiTwotoneDelete } from "react-icons/ai";
import { ContainerUsers } from "../../pages/SignUp/Signup.styles";
import { Actions, ButtonUserDelete, Image, Info } from "../Components.styles";

interface UserProps {
  user: User;
  onDelete: (id: number) => void;
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const UserCard = ({ user, onDelete } : UserProps) => {
  console.log(user);
  return (
    <ContainerUsers>
      <Image
        src={user?.display_picture}
        alt={`${user.first_name} ${user.last_name}`}
      />
      <Info>
      <p>{`${capitalizeFirstLetter(user.first_name)} ${capitalizeFirstLetter(user.last_name)}`}</p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </Info>
      <Actions>
        <ButtonUserDelete onClick={() => onDelete(user.id)}>
          <AiTwotoneDelete />
        </ButtonUserDelete>
      </Actions>
    </ContainerUsers>
  );
};

export default memo(UserCard);