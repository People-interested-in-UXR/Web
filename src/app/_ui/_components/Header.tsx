import { HTMLAttributes } from "react";

export default function Header({ children }: HTMLAttributes<HTMLElement>) {
  return (
    <header className="flex md:px-10 px-4 py-6 justify-between text-sub bg-white">
      {children}
    </header>
  );
}
