import Image from "next/image";
import { MouseEvent } from "react";

interface IImage {
  src: string;
  alt: string;
  height: number;
  width: number;
  className?: string;
  loading?: "eager" | "lazy" | undefined;
  onClick?: (event: MouseEvent) => void;
  // ref?
  // srcSet
}

export default function Icon({ ...args }: IImage) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...args}></Image>;
}
