import { HTMLAttributes } from "react";

export const Section = ({
  children,
  className,
}: HTMLAttributes<HTMLElement>) => {
  return <section className={className}>{children}</section>;
};
