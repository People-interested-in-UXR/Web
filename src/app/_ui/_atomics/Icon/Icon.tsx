import Image from "next/image";

interface IImage {
  src: string;
  alt: string;
  height: number;
  width: number;
  loading?: "eager" | "lazy" | undefined;
  // ref?
  // srcSet
}

export default function Icon(args: IImage) {
  return <Image {...args}></Image>;
}
