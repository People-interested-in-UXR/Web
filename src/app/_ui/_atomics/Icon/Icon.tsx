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
  style?: any;

  // ref?
  // srcSet
}

export default function Icon({ ...args }: IImage) {
  return <Image {...args}></Image>;
}
