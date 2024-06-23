import { HTMLAttributes } from "react";

export default function Section({ children }: HTMLAttributes<HTMLElement>) {
  return <section className="bg-secondary">{children}</section>;
}
