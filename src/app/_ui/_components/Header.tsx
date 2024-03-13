import { HTMLAttributes } from "react";

export default function Header({ children }: HTMLAttributes<HTMLElement>) {
  return (
    <header className="flex px-10 py-6 justify-between text-sub bg-white">
      {children}
    </header>
  );
}
