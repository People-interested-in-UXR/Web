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

export const Icon = ({ ...args }: IImage) => {
  /* eslint-disable jsx-a11y/alt-text */
  return <Image {...args}></Image>;
};
