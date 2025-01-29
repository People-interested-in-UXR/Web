import { HTMLAttributes } from "react";

export default function Section({
  children,
  className,
}: HTMLAttributes<HTMLElement>) {
  return <section className={className}>{children}</section>;
}
