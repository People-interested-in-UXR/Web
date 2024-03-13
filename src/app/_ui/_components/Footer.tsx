import { HTMLAttributes } from "react";

export default function Footer({ children }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className="px-10 py-8 bg-teriary flex justify-between">
      {children}
    </footer>
  );
}
