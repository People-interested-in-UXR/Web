import { ReactNode } from "react";

export interface IToast {
  children: ReactNode[] | ReactNode;
  // positionY: string;
}
{
  /* TODO: 160 /  */
}
const Toast = ({ children }: IToast) => {
  return (
    <div
      className={`${Array.isArray(children) ? "justify-between" : "justify-center"} flex rounded-2xl bg-brown-900 text-accent items-center px-6 py-[17px] w-full max-w-[640px]`}
    >
      {children}
    </div>
  );
};

export default Toast;
