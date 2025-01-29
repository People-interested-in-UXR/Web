import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({ children }: IButton) => {
  return (
    <button className="bg-btn-default hover:bg-btn-hover text-accent h4-600-18 px-10 py-4 rounded-2xl max-sm:b3-600-14">
      {children}
    </button>
  );
};

export default Button;
