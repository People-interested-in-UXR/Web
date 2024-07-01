"use client";
import { MouseEventHandler, ReactNode } from "react";

interface IRegisteredButton {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
const RegisterButton = ({ children, onClick }: IRegisteredButton) => {
  return (
    <button
      className="bg-primary-red px-10 py-4 rounded-2xl text-accent sm:bottom-20 bottom-10 flex justify-center gap-2.5"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RegisterButton;
