import React, { FC } from "react";
import { styled } from "@mui/material";

interface IStylesProps {
  isSelected: boolean;
}

const Select = styled("span")<IStylesProps>(({ isSelected }) => ({
  border: "1px solid gold",
  borderRadius: 5,
  padding: 10,
  textAlign: "center",
  fontFamily: "var(--montserrat)",
  cursor: "pointer",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "gold",
    color: "black",
  },
  width: "22%",
  margin: 5,
  ...(isSelected
    ? { backgroundColor: "gold", color: "black", fontWeight: 700 }
    : {}),
}));
interface ISelectButton {
  children: string | number;
  onClick: () => void;
  selected: boolean;
}

const SelectButton: FC<ISelectButton> = ({ children, selected, onClick }) => {
  return (
    <Select isSelected={selected} onClick={onClick}>
      {children}
    </Select>
  );
};

export default SelectButton;
