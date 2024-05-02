import { ReactNode } from "react";

interface ICheckbox {
  id: string;
  children: ReactNode;
}
export default function Checkbox({ id, children }: ICheckbox) {
  return (
    <div>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
