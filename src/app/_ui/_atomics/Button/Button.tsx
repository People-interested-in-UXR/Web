import { ReactNode } from "react";

interface IButton {
  children: ReactNode;
}
const Button = ({ children }: IButton) => {
  return (
    <button className="bg-btn-default hover:bg-btn-hover text-accent h4-600-18 px-10 py-4 rounded-2xl">
      {children}
    </button>
  );
};

export default Button;
