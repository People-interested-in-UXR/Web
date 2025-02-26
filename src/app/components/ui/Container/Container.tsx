import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export default function Container({
  children,
  ...args
}: HTMLAttributes<HTMLElement>) {
  return <main {...args}>{children}</main>;
}
